import { createUploadId } from './helpers/create-upload-id.helper';
import { UploadQueue } from './upload-queue';

export class Uploader {
  private aborted = false;
  private chunks: Int8Array[] = [];
  private uploadsFinished = false;
  private shouldFinalize = false;
  private uploadId = createUploadId();
  private uploadQueue: UploadQueue;
  private uploadUrl = '/api/upload';

  constructor(private readonly options) {
    this.uploadQueue = new UploadQueue(
      this.onUploadsFinished.bind(this),
      this.options.maxConcurrentUploads
    );

    this.uploadQueue.onProgress = this.onProgress.bind(this);
  }

  onUploadsFinished() {}

  onProgress(bytesUploaded) {
    if (!this.aborted) {
      this.onprogress({
        bytesUploaded,
      });
    }
  }

  onprogress(options: any) {}
}
