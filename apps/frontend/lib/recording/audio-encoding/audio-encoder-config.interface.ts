export interface AudioEncoderConstraints {
  autoGainControl: boolean;
  echoCancellation: boolean;
  noiseSuppression: boolean;
}

export interface AudioEncoderConfig {
  recordingGain: number;
  numberOfChannels: number;
  bufferSize: number;
  constraints: AudioEncoderConstraints;
  useAudioWorklet: boolean;
  encoderBitRate: number;
  originalSampleRate: number;
}
