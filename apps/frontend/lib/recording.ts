import { Recorder } from './recorder';
import { RecordingStore } from './recording-store';

export class Recording {
  private store: RecordingStore;
  private recorder: Recorder;

  public onStart: () => void;
  public onDataAvailable: (data: Int8Array) => void;
  public onStop: () => void;
  public onPause: () => void;
  public onResume: () => void;
  public onError: (error: Error) => void;

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

  private onRecorderDataAvailable(blob: Int8Array) {
    if (blob.length > 0) {
      this.store.appendData(blob);
    }
  }

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
