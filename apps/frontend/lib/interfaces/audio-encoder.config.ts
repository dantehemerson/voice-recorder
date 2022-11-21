interface Constraints {
  autoGainControl: boolean;
  echoCancellation: boolean;
  noiseSuppression: boolean;
}

export interface AudioEncoderConfig {
  recordingGain: number;
  numberOfChannels: number;
  bufferSize: number;
  constraints: Constraints;
  useAudioWorklet: boolean;
  encoderBitRate: number;
  originalSampleRate: number;
}
