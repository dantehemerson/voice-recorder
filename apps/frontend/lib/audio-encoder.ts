import { EncoderStatus } from './enums/encoder-status.enum';
import { generateRandomId } from './helpers/generate-random-id.helper';
import { AudioEncoderConfig } from './interfaces/audio-encoder.config';

export class AudioEncoder {
  private config: AudioEncoderConfig;
  private jobId: string;
  private worker: Worker;
  private state: EncoderStatus;

  public onDataAvailable: (data: Int8Array) => void;
  public onStopped: () => void;

  constructor(config: AudioEncoderConfig) {
    this.jobId = generateRandomId();
    this.config = config;
    this.state = EncoderStatus.INACTIVE;
  }

  getState(): EncoderStatus {
    return this.state;
  }

  start() {
    this.worker.postMessage({
      command: 'start',
      jobId: this.jobId,
      config: this.config,
    });
  }

  sendData(buffers: Float32Array[]) {
    this.worker.postMessage({
      command: 'data',
      jobId: this.jobId,
      buffers,
    });
  }

  stop() {
    this.worker.postMessage({
      command: 'stop',
      jobId: this.jobId,
    });
  }

  waitForWorker() {
    try {
      if (this.state === EncoderStatus.READY) {
        return;
      }

      // if (
      //   this.state !== EncoderStatus.INACTIVE &&
      //   this.state !== EncoderStatus.ERROR
      // ) {
      //   this.prestart();
      // }
      this.prestart();
    } catch (error) {
      console.error('MP3 worker failed');

      throw error;
    }
  }

  // TODO: Start worker only once on app start
  private prestart() {
    this.state = EncoderStatus.LOADING;

    const mp3WorkerUrl = 'http://localhost:4200/mp3worker.min.js';

    const workerScript = `importScripts("${mp3WorkerUrl}");`;

    const url = URL.createObjectURL(
      new Blob([workerScript], { type: 'application/javascript' })
    );

    this.worker = new Worker(url);

    this.worker.onmessage = (event) => {
      switch (event.data.message) {
        case 'ready':
          this.state = EncoderStatus.READY;
          break;
        case 'data':
          this.onDataAvailable?.(event.data.data);
          break;
        case 'stopped':
          this.onStopped?.();
          break;
      }
    };

    this.worker.onerror = (error) => {
      this.state = EncoderStatus.ERROR;
      console.error('MP3 worker failed', error);
    };
  }
}
