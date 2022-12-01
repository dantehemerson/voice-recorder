import { retryableFetch } from './http/retryable-fetch.helper';
import { QueueItem } from './types/queue-item.type';

export class UploadQueue {
  private uploadURLWithId = null;
  private queue = [];
  private inProgress = 0;
  private chunksAdded = 0;
  private completed = false;
  private totalUploadedBytes = 0;
  private started = false;

  public onProgress: any;

  constructor(
    private onUploadsFinished,
    private readonly maxConcurrentUploads
  ) {}

  async startChunkUpload(queueItem: QueueItem) {
    try {
      const data = new FormData();
      data.append('chunk', queueItem.chunk, 'chunk');

      await retryableFetch(
        `${this.uploadURLWithId}/chunk/${queueItem.chunkIndex}`,
        {
          method: 'POST',
          body: data,
        }
      );

      this.inProgress--;
      this.totalUploadedBytes += queueItem.chunk.size;
      this?.onProgress(this.totalUploadedBytes);

      if (this.completed && this.inProgress === 0) {
        this?.onUploadsFinished();
      } else {
        this.startUploads();
      }
    } catch (error) {
      console.error('Error uploading chunk', { error, queueItem });
    }
  }

  startUploads() {
    const toUpload = this.queue.splice(
      0,
      this.maxConcurrentUploads - this.inProgress
    );
    this.inProgress += toUpload.length;

    for (const queueItem of toUpload) {
      this.startChunkUpload(queueItem);
    }
  }

  start(uploadURLWithId: string) {
    if (!this.started) {
      this.started = true;
      this.uploadURLWithId = uploadURLWithId;

      if (this.queue.length) {
        this.startUploads();
      }
    }
  }

  add(chunk) {
    this.queue.push({
      chunk,
      chunkIndex: this.chunksAdded,
    });
    this.chunksAdded++;

    if (this.started) {
      this.startUploads();
    }
  }

  complete() {
    this.completed = true;
    if (this.started && this.inProgress === 0) {
      this?.onUploadsFinished();
    }
  }

  abort() {
    this.queue = [];
    this.onUploadsFinished = null;
    this.onProgress = null;
    this.complete();
  }
}
