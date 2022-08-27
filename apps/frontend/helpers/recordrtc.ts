/* eslint-disable @typescript-eslint/no-var-requires */
import { exists, window } from 'browser-monads-ts';
import type RecordRTC from 'recordrtc';

let Recorder: RecordRTC;

if (exists(window)) {
  Recorder = require('recordrtc');
}

export { Recorder, RecordRTC };
