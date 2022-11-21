import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { isEdge } from '../helpers/browser/browser.helpers';
import { AudioEncoder } from './audio-encoder';
import { RecorderStatus } from './enums/recorder-status.enum';

export class Recorder {
  private state: RecorderStatus;
  private encoder: AudioEncoder;
  private audioContext: AudioContext;
  private scriptProcessorNode: AudioWorkletNode;
  private sourceNode: MediaStreamAudioSourceNode;
  private stream: MediaStream;
  private config;

  public onStart: () => void;
  public onDataAvailable: (data: Int8Array) => void;
  public onStop: () => void;
  public onError: (error: Error) => void;

  constructor(config) {
    this.state = RecorderStatus.STOPPED;
    this.config = Object.assign(
      {
        recordingGain: 1,
        numberOfChannels: 1,
        bufferSize: 4096,
        constraints: {},
        useAudioWorklet: !1,
      },
      config
    );
  }

  async start() {
    if (this.state === RecorderStatus.STOPPED) {
      this.state = RecorderStatus.STARTING;

      try {
        await this.encoder.waitForWorker();

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

        this.onStart?.();
      } catch (error) {
        this.state = RecorderStatus.STOPPED;

        console.log('Error while starting recorder', error);
        throw error;
      }
    }
  }

  private async createAudioContext() {
    const AudioContextRef =
      window.AudioContext || (window as any).webkitAudioContext;

    this.audioContext = new AudioContextRef();

    await this.audioContext.audioWorklet.addModule('/processor.js');

    this.scriptProcessorNode = new AudioWorkletNode(
      this.audioContext,
      'script-processor-replacement',
      {
        numberOfOutputs: 0,
      }
    );

    this.scriptProcessorNode.port.onmessage = (event) => {
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

    this.encoder.onDataAvailable = (data) => {
      this.onDataAvailable?.(data);
    };

    this.encoder.onStopped = () => {
      this.onStop?.();
    };

    await this.encoder.start();
  }
}
