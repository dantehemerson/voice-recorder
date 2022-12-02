import { MaxChunkCountError } from './errors/max-chunk-count.error';
import { NoChunksFoundError } from './errors/no-chunk-found.error';
import { SubmitError } from './errors/submit.error';
import { Recorder } from './recorder';
import { RecordingStore } from './recording-store';
import { Uploader } from './uploader';

export class Recording {
  private store: RecordingStore;
  private recorder: Recorder;
  private uploader: Uploader;
  private unixTime: number;
  private audioBlob: Blob;
  private audioBlobUrl: any;
  private media;
  private wasNoChunksFoundError = false;

  public onStart: () => void;
  public onDataAvailable: (data: Int8Array) => void;
  public onStop: (sucess: boolean) => void;
  public onPause: () => void;
  public onResume: () => void;
  public onError: (error: Error) => void;

  public onsavepercent: (percentage: number) => void;
  public onsavesuccess: () => void;
  public onsaveerror: (error: Error) => void;

  constructor(private readonly options) {
    this.store = new RecordingStore();
    this.recorder = new Recorder({
      recordingGain: 1,
      numberOfChannels: 1,
      encoderBitRate: 96,
      constraints: {
        autoGainControl: this.options.autoGainControl,
        echoCancellation: this.options.removeBackgroundNoise,
        noiseSuppression: this.options.removeBackgroundNoise,
      },
    });

    this.recorder.onDataAvailable = this.onRecorderDataAvailable.bind(this);
    this.recorder.onStart = this.onRecorderStart.bind(this);
    this.recorder.onStop = this.onRecorderStop.bind(this);
    this.recorder.onError = this.onRecorderError.bind(this);
  }

  getAudioBlobUrl(): string {
    return this.store.generateAudioBlobUrl();
  }

  createUploader() {
    this.destroyUploader();
    this.uploader = new Uploader();

    this.uploader.onProgress = (progress) => {
      if (this.audioBlob) {
        this?.onsavepercent(
          Math.round((progress.bytesUploaded / this.audioBlob.size) * 100)
        );
      }
    };

    this.uploader.onsuccess = (response) => {
      this.media = {
        mediaId: response.mediaId,
        ownerToken: response.ownerToken,
        time: this.unixTime,
      };
      this?.onsavesuccess();
    };

    this.uploader.onerror = (error: Error) => {
      if (error instanceof MaxChunkCountError) {
        this.stop();
      }
    };

    this.uploader.onfinalizeerror = (error: { error: Error }) => {
      if (
        !(error.error instanceof NoChunksFoundError) ||
        this.wasNoChunksFoundError
      ) {
        if (!(error.error instanceof SubmitError)) {
          this.destroyUploader();
        }
        this?.onsaveerror(error.error);
      } else {
        this.wasNoChunksFoundError = true;
        this.createUploader();
        this.uploader.addData(this.audioBlob);
        this.uploader.complete();
        this.uploader.finalize();
      }
    };
  }

  destroyUploader() {
    if (this.uploader) {
      this.uploader.onsuccess = null;
      this.uploader.onfinalizeerror = null;
      this.uploader.onprogress = null;
      this.uploader = null;
    }
  }

  private onRecorderDataAvailable(blob: Int8Array) {
    if (blob.length > 0) {
      this.store.appendData(blob);
      this.uploader.addData(blob);
    }
  }

  onRecordingStarted() {
    this.store.reset();
    this.unixTime = Date.now();
    this.audioBlobUrl = null;
    this.createUploader();
    this?.onStart();
  }

  onRecordingStopped() {
    if (!this.store.isEmpty()) {
      this.uploader.complete();
      this.audioBlobUrl = this.store.generateAudioBlobUrl();
      this?.onStop(true);
    } else {
      this.error('Nothing recorded', 'No audio data available');
      this?.onStop(false);
    }
  }

  onRecordingError(error: Error) {
    if (error.name === 'WorkerError') {
      this.error(
        'WorkerError',
        'Recording worker failed to load. Please check your internet connection and try again.'
      );
    } else {
      this.error(
        'MicAccessError',
        'Could not start recording! Please allow microphone access in your web browser settings.'
      );
    }
  }

  error(message: string, details: string) {}

  private onRecorderStart() {
    this.store.reset();
    this?.onStart();
  }

  private onRecorderStop() {
    this?.onStop();
  }

  private onRecorderError(error) {
    this?.onError(error);
  }

  public async start() {
    if (!Recorder.isRecordingSupported()) {
      console.log(`Recording is not supported in this browser`);
      return;
    }

    if (this.store.isEmpty() && !this.uploader && !this.media) {
      this.recorder.start();
    }

    this.error(
      'RecordingNotSupported',
      'Your web browser does not support audio recording! Please update to a newer browser.'
    );

    await this.recorder.start();
  }

  public async stop() {
    await this.recorder.stop();
  }

  public async pause() {
    await this.recorder.pause();
    this?.onPause();
  }

  public async resume() {
    await this.recorder.resume();
    this?.onResume();
  }

  static preload() {
    // return Recorder.preload();
  }
}
