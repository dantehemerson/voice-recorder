import { MediaInfoDto } from '@voice-recorder/shared-types';
import { Utils } from '@lib/helpers/utils.helper';
import { MaxChunkCountError } from './errors/max-chunk-count.error';
import { NoChunksFoundError } from './errors/no-chunk-found.error';
import { SubmitError } from './errors/submit.error';
import { createUploadId } from './helpers/create-upload-id.helper';
import { retryableFetch } from './http/retryable-fetch.helper';
import { MediaInfo } from './interfaces/media-info.interface';
import { OnUploaderProgressPayload } from './interfaces/on-uploader-progress-payload.interface';
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
    uploadUrl: `${process.env.NEXT_PUBLIC_API_URL}/upload`,
  };

  /** Upload Listeners */
  public onSuccess: (data: Omit<MediaInfo, 'time'>) => void;
  public onProgress: (data: OnUploaderProgressPayload) => void;
  public onError: (error: Error) => void;
  public onFinalizeError: (error: Error) => void;

  constructor(options?: UploaderOptions) {
    this.options = Utils.mergeObjects(this.defaultOptions, options);

    this.uploadQueue = new UploadQueue(
      this.onUploadsFinished.bind(this),
      this.options.maxConcurrentUploads
    );

    this.uploadQueue.onProgress = this.onQueueProgress.bind(this);

    this.alive();
  }

  alive() {
    const aliveRequest = retryableFetch(this.options.uploadUrl + '/alive', {
      method: 'HEAD',
    });

    aliveRequest.then(() => {
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
    if (this.chunks.length >= 1 && this.chunks[0].size !== 0) {
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
        this.onError?.(
          new MaxChunkCountError(
            'Max upload chunk count exceeded(file too large)'
          )
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

      for (let totalUploadedSize = 0; totalUploadedSize < newBlob.size; ) {
        const lastChunk = this.chunks[this.chunks.length - 1];
        const lastChunkSize = lastChunk.size;
        const missingChunkSize = this.options.chunkSize - lastChunkSize;

        if (newBlob.size - totalUploadedSize <= missingChunkSize) {
          this.chunks[this.chunks.length - 1] = new Blob([
            lastChunk,
            newBlob.slice(totalUploadedSize),
          ]);
          break;
        }

        const missingChunks = newBlob.slice(
          totalUploadedSize,
          totalUploadedSize + missingChunkSize
        );
        totalUploadedSize += missingChunkSize;

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
      const result = await retryableFetch<MediaInfoDto>(
        `${this.uploadURLWithId}/finalize`,
        {
          method: 'POST',
          parseJson: true,
        }
      );

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
        this.onSuccess?.({
          mediaId: result.mediaId,
          ownerToken: result.ownerToken,
        });
      }
    } catch (error) {
      console.error('Error finalizing upload', { error });
      if (!this.aborted) {
        this.onFinalizeError?.(error);
      }
    }
  }

  private onQueueProgress(bytesUploaded: number) {
    if (!this.aborted) {
      this.onProgress?.({
        bytesUploaded,
      });
    }
  }
}
