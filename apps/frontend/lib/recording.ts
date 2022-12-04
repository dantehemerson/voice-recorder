import { Utils } from '../helpers/utils.helper';
import { AudioEncoderConstraints } from './audio-encoding/audio-encoder-config.interface';
import { MaxChunkCountError } from './errors/max-chunk-count.error';
import { NoChunksFoundError } from './errors/no-chunk-found.error';
import { SubmitError } from './errors/submit.error';
import { MediaInfo } from './interfaces/media-info.interface';
import { Recorder } from './recorder';
import { RecordingStore } from './recording-store';
import { Uploader } from './uploader';

export class Recording {
  private store: RecordingStore;
  private recorder: Recorder;
  private uploader: Uploader;
  private unixTime: number;
  private audioBlob: Blob;
  private audioBlobUrl: string;
  private media: MediaInfo;
  private wasNoChunksFoundError = false;

  /** Recorder events */
  public onStart?: () => void;
  public onStop?: (success: boolean) => void;
  public onPause?: () => void;
  public onResume?: () => void;
  public onError?: (error: Error) => void;

  /** Saving events */
  public onSavePercent?: (percentage: number) => void;
  public onSaveSuccess?: () => void;
  public onSaveError?: (error: Error) => void;

  constructor(private readonly options: Partial<AudioEncoderConstraints>) {
    this.options = Utils.mergeObjects(
      {
        autoGainControl: true,
        echoCancellation: true,
        noiseSuppression: true,
      },
      options
    );

    this.store = new RecordingStore();
    this.recorder = new Recorder({
      recordingGain: 1,
      numberOfChannels: 1,
      encoderBitRate: 96,
      constraints: {
        autoGainControl: this.options.autoGainControl,
        echoCancellation: this.options.echoCancellation,
        noiseSuppression: this.options.noiseSuppression,
      },
    });

    this.recorder.onDataAvailable = this.onRecorderDataAvailable.bind(this);
    this.recorder.onStart = this.onRecordingStarted.bind(this);
    this.recorder.onStop = this.onRecordingStopped.bind(this);
    this.recorder.onError = this.onRecordingError.bind(this);
  }

  getAudioBlobUrl(): string {
    return (
      this.audioBlobUrl ||
      (this.audioBlobUrl = this.store.generateAudioBlobUrl())
    );
  }

  createUploader() {
    this.destroyUploader();
    this.uploader = new Uploader();

    this.uploader.onProgress = (progress) => {
      if (this.audioBlob) {
        this.onSavePercent?.(
          Math.round((progress.bytesUploaded / this.audioBlob.size) * 100)
        );
      }
    };

    this.uploader.onSuccess = (response) => {
      this.media = {
        mediaId: response.mediaId,
        ownerToken: response.ownerToken,
        time: this.unixTime,
      };
      this.onSaveSuccess?.();
    };

    this.uploader.onError = (error: Error) => {
      if (error instanceof MaxChunkCountError) {
        this.stop();
      }
    };

    this.uploader.onFinalizeError = (error: Error) => {
      if (
        !(error instanceof NoChunksFoundError) ||
        this.wasNoChunksFoundError
      ) {
        if (!(error instanceof SubmitError)) {
          this.destroyUploader();
        }
        this.onSaveError?.(error);
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
      this.uploader.onSuccess = null;
      this.uploader.onFinalizeError = null;
      this.uploader.onProgress = null;
      this.uploader = null;
    }
  }

  private onRecorderDataAvailable(blob: Int8Array) {
    if (blob.length > 0) {
      this.store.appendData(blob);
      this.uploader.addData(blob);
    }
  }

  private onRecordingStarted() {
    this.store.reset();
    this.audioBlob = null;
    this.audioBlobUrl = null;
    this.unixTime = Date.now();
    this.createUploader();
    this.onStart?.();
  }

  private onRecordingStopped() {
    if (!this.store.isEmpty()) {
      this.uploader.complete();
      this.audioBlob = this.store.generateAudioBlob();
      this.audioBlobUrl = this.store.generateAudioBlobUrl();
      this.onStop?.(true);
    } else {
      this.error('Nothing recorded', 'No audio data available');
      this.onStop?.(false);
    }
  }

  private onRecordingError(error: Error) {
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

  private error(name: string, details: string) {
    const error = new Error(details);
    error.name = name;

    this.onError?.(error);
  }

  async start() {
    if (!Recorder.isRecordingSupported()) {
      this.error(
        'RecordingNotSupported',
        'Your web browser does not support audio recording! Please update to a newer browser.'
      );
      return;
    }

    if (this.store.isEmpty() && !this.uploader && !this.media) {
      await this.recorder.start();
    }
  }

  async stop() {
    await this.recorder.stop();
  }

  async pause() {
    await this.recorder.pause();
    this.onPause?.();
  }

  async resume() {
    await this.recorder.resume();
    this.onResume?.();
  }

  save() {
    if (this.uploader) {
      this.uploader.finalize();
    } else if (this.audioBlob) {
      this.createUploader();
      this.uploader.addData(this.audioBlob);
      this.uploader.complete();
      this.uploader.finalize();
    }
  }

  static preload() {
    // return Recorder.preload();
  }
}
