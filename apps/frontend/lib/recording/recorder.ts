import { isEdge } from '@lib/helpers/browser/browser.helpers';
import { Utils } from '@lib/helpers/utils.helper';
import { AudioEncoder } from './audio-encoding/audio-encoder';
import { AudioEncoderConfig } from './audio-encoding/audio-encoder-config.interface';
import { RecorderStatus } from './enums/recorder-status.enum';

export class Recorder {
  private state: RecorderStatus;
  private encoder: AudioEncoder;

  private audioContext: AudioContext;
  private scriptProcessorNode: AudioWorkletNode;
  private sourceNode: MediaStreamAudioSourceNode;
  private stream: MediaStream;
  private config: Partial<AudioEncoderConfig>;

  private aborted = false;

  public onStart: () => void;
  public onDataAvailable: (data: Int8Array) => void;
  public onStop: () => void;
  public onError: (error: Error) => void;

  constructor(config: Partial<AudioEncoderConfig>) {
    this.state = RecorderStatus.STOPPED;
    this.config = Utils.mergeObjects(
      {
        recordingGain: 1,
        numberOfChannels: 1,
        bufferSize: 4096,
        constraints: {},
        useAudioWorklet: false,
      },
      config
    );
  }

  async start() {
    if (this.state === RecorderStatus.STOPPED) {
      this.state = RecorderStatus.STARTING;

      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: isEdge()
            ? true
            : {
                echoCancellation: false,
              },
        });

        this.state = RecorderStatus.RECORDING;

        await this.createAudioContext();

        await this.createAndStartEncoder();

        !this.aborted && this.onStart?.();
      } catch (error) {
        this.state = RecorderStatus.STOPPED;

        console.log('Error while starting recorder', error);
        throw error;
      }
    }
  }

  private async createAudioContext() {
    const AudioContextRef =
      window.AudioContext || (window as WebkitWindow).webkitAudioContext;

    this.audioContext = new AudioContextRef();

    await this.audioContext.audioWorklet.addModule('/processor.js');

    this.scriptProcessorNode = new AudioWorkletNode(
      this.audioContext,
      'script-processor-replacement'
    );

    this.scriptProcessorNode.port.onmessage = event => {
      if (this.state === RecorderStatus.RECORDING) {
        this.encoder.sendData(event.data);
      }
    };

    this.sourceNode = this.audioContext.createMediaStreamSource(this.stream);
    this.sourceNode.connect(this.scriptProcessorNode);
    this.scriptProcessorNode.connect(this.audioContext.destination);
  }

  private async createAndStartEncoder() {
    this.encoder = new AudioEncoder(
      Object.assign({}, this.config, {
        originalSampleRate: this.audioContext.sampleRate,
      })
    );

    await this.encoder.waitForWorker();

    this.encoder.onDataAvailable = data => {
      !this.aborted && this.onDataAvailable?.(data);
    };

    this.encoder.onStopped = () => {
      !this.aborted && this.onStop?.();
    };

    await this.encoder.start();
  }

  private async destroyAudioContext() {
    if (this.audioContext.audioWorklet) {
      this.scriptProcessorNode.port.onmessage = null;
      this.scriptProcessorNode.disconnect();
    }

    this.sourceNode.disconnect();
    this.audioContext.close();
    delete this.audioContext;
  }

  stop() {
    if (
      this.state === RecorderStatus.RECORDING ||
      this.state === RecorderStatus.PAUSED
    ) {
      this.state = RecorderStatus.STOPPED;
      this.encoder.stop();
      this.destroyAudioContext();
      this.destroyStream();
    } else if (this.state === RecorderStatus.STARTING) {
      /** TODO: Add cancelStartCallback here */
      this.state = RecorderStatus.STOPPED;
    }
  }

  abort() {
    this.aborted = true;
    this.stop();
  }

  destroyStream() {
    this.stopStream();
    delete this.stream;
  }

  stopStream() {
    this.stream.getTracks().forEach(track => {
      track.stop();
    });
  }

  pause() {
    if (this.state === RecorderStatus.RECORDING) {
      this.state = RecorderStatus.PAUSED;
    }
  }

  resume() {
    if (this.state === RecorderStatus.PAUSED) {
      this.state = RecorderStatus.RECORDING;
    }
  }

  static isRecordingSupported(): boolean {
    return Boolean(navigator?.mediaDevices?.getUserMedia);
  }

  preload() {
    throw new Error('Method not implemented.');
  }
}
