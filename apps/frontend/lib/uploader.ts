import { Utils } from '../helpers/utils.helper';
import { MaxChunkCountError } from './errors/max-chunk-count.error';
import { NoChunksFoundError } from './errors/no-chunk-found.error';
import { SubmitError } from './errors/submit.error';
import { createUploadId } from './helpers/create-upload-id.helper';
import { retryableFetch } from './http/retryable-fetch.helper';
import { UploaderOptions } from './interfaces/uploader-options.interface';
import { UploadQueue } from './upload-queue';

export class Uploader {
  private chunks: Blob[] = [];

  private uploadId = createUploadId();
  private uploadQueue: UploadQueue;
  private uploadURLWithId: string;

  private aborted = false;
  private uploadsFinished = false;
  private shouldFinalize = false;

  private options: UploaderOptions;
  private defaultOptions: UploaderOptions = {
    chunkSize: 100000,
    maxChunkCount: 5000,
    maxConcurrentUploads: 3,
    uploadUrl: '/api/upload',
  };

  /** Listeners */
  onsuccess: (options: any) => void;
  onprogress: (options: any) => void;
  onerror: (error: any) => void;
  onfinalizeerror: (options: any) => void;

  constructor(options?: UploaderOptions) {
    this.options = Utils.mergeObjects(this.defaultOptions, options);

    this.uploadQueue = new UploadQueue(
      this.onUploadsFinished.bind(this),
      this.options.maxConcurrentUploads
    );

    this.uploadQueue.onProgress = this.onProgress.bind(this);

    this.alive();
  }

  alive() {
    const aliveRequest = retryableFetch(this.options.uploadUrl + '/alive', {
      method: 'HEAD',
    });

    aliveRequest.then((reponse) => {
      try {
        this.uploadURLWithId = `${this.options.uploadUrl}/${this.uploadId}`;
        this.uploadQueue.start(this.uploadURLWithId);
      } catch (error) {
        console.error('Error starting upload', { error });
      }
    });
  }

  abort() {
    this.uploadQueue.abort();
    this.aborted = true;
  }

  complete() {
    if (this.chunks.length !== 0 && this.chunks[0].size !== 0) {
      this.addLatestChunk();
      this.uploadQueue.complete();
    }
  }

  finalize() {
    if (this.uploadsFinished) {
      this.remoteFinalize();
    } else {
      this.shouldFinalize = true;
    }
  }

  private addLatestChunk() {
    if (this.chunks.length > this.options.maxChunkCount) {
      if (this.chunks.length === this.options.maxChunkCount + 1) {
        this?.onerror(
          new MaxChunkCountError('Max upload chunk count exceeded')
        );
      }
    } else {
      this.uploadQueue.add(this.chunks[this.chunks.length - 1]);
    }
  }

  addData(data) {
    const newBlob = new Blob([data]);
    if (newBlob.size !== 0) {
      if (this.chunks.length === 0) {
        this.chunks.push(new Blob());
      }

      for (let t = 0; t < newBlob.size; ) {
        const lastChunk = this.chunks[this.chunks.length - 1];
        const lastChunkSize = lastChunk.size;
        const missingChunkSize = this.options.chunkSize - lastChunkSize;

        if (newBlob.size - t <= missingChunkSize) {
          this.chunks[this.chunks.length - 1] = new Blob([
            lastChunk,
            newBlob.slice(t),
          ]);
          break;
        }

        const missingChunks = newBlob.slice(t, t + missingChunkSize);
        t += missingChunkSize;

        this.chunks[this.chunks.length - 1] = new Blob([
          lastChunk,
          missingChunks,
        ]);

        this.addLatestChunk();
        this.chunks.push(new Blob());
      }
    }
  }

  private async onUploadsFinished() {
    this.uploadsFinished = true;
    if (this.shouldFinalize) {
      await this.remoteFinalize();
    }
  }

  async remoteFinalize() {
    try {
      const result = await retryableFetch(`${this.uploadURLWithId}/finalize`, {
        method: 'POST',
        parseJson: true,
      });

      if (result.status !== 0) {
        if (result.status === 1) {
          throw new NoChunksFoundError('No chunks found on the server');
        } else if (result.status === 2) {
          throw new SubmitError('Submission to processing queue failed.');
        } else {
          throw new Error('Finalize failed for unspecified reason.');
        }
      }

      if (!result.mediaId) {
        throw new Error('no mediaId');
      }
      if (!result.ownerToken) {
        throw new Error('no owner token');
      }

      if (!this.aborted) {
        this?.onsuccess({
          mediaId: result.mediaId,
          ownerToken: result.ownerToken,
        });
      }
    } catch (error) {
      console.error('Error finalizing upload', { error });
      if (!this.aborted) {
        this?.onfinalizeerror({
          error,
        });
      }
    }
  }

  private onProgress(bytesUploaded) {
    if (!this.aborted) {
      this?.onprogress({
        bytesUploaded,
      });
    }
  }
}
