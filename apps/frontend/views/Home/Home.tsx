import { useContext } from 'react';
import { HomeContext } from '../../contexts/home.context';
import {
  HomeActionType,
  RecorderStatus,
} from '../../contexts/reducers/home-context.reducer';
import { captureMicrophone } from '../../helpers/mic/capture-microphone.helper';
import { InitialView } from './InitialView';
import { RecordFinishedView } from './RecordFinishedView';
import { RecordingView } from './RecordingView';

export function Home() {
  const { dispatchHomeEvent, homeState } = useContext(HomeContext);
  const { state } = homeState;

  async function startRecording() {
    try {
      const stream = homeState.mic ?? (await captureMicrophone());

      const [track] = stream.getAudioTracks();
      const settings = track.getSettings();
      console.log('🤫 Dante ➤ startRecording ➤ settings', settings);

      let audioContext = new AudioContext();
      await audioContext.audioWorklet.addModule('/processor.js');

      console.log('audio context', audioContext);
      const sourceNode = audioContext.createMediaStreamSource(stream);

      const audioRecorder = new AudioWorkletNode(
        audioContext,
        'script-processor-replacement'
      );

      sourceNode.connect(audioRecorder);
      audioRecorder.connect(audioContext.destination);

      const scriptT = 'importScripts("'.concat(
        'http://localhost:4200/mp3worker.min.js',
        '");'
      );

      const url = URL.createObjectURL(
        new Blob([scriptT], { type: 'application/javascript' })
      );

      const worker = new Worker(url);
      const audioData = [];

      worker.onmessage = (event) => {
        switch (event.data.message) {
          case 'ready':
            // dispatchHomeEvent({
            //   ready: 'ready'
            // })
            console.log('READY');
            break;
          case 'data':
            // event.data.jobId in Ss &&
            //   Ss[e.data.jobId].ondataavailable(e.data.data);
            if (event.data.data.length > 0) {
              console.log('DATA', event);
              audioData.push(event.data.data);
            }
            break;
          case 'stopped':
            console.log('STOPPED', event);
            // e.data.jobId in Ss && Ss[e.data.jobId].onstopped();
            break;
        }
        // const blob = new Blob(event.data, { type: 'audio/mpeg' });
        // const url = URL.createObjectURL(blob);
      };

      audioRecorder.port.onmessage = (event) => {
        // console.log('🤫 Dante ➤ startRecording ➤ event', event);
        worker.postMessage({
          command: 'data',
          jobId,
          buffers: event.data,
        });
      };

      // worker.ondataavailable = () => {}

      worker.onerror = (error) => {
        console.log('Error worker', error);
      };

      const jobId = 'bf651b55-464f-44e8-97f8-69e937edafde';

      console.log(worker);

      /** start  */
      worker.postMessage({
        command: 'start',
        jobId,
        config: {
          recordingGain: 1,
          numberOfChannels: 1,
          bufferSize: 4096,
          constraints: {
            autoGainControl: true,
            echoCancellation: true,
            noiseSuppression: true,
          },
          useAudioWorklet: false,
          encoderBitRate: 96,
          originalSampleRate: 44100,
        },
      });

      let audioBlob;
      let audioBlobUrl;

      setTimeout(() => {
        /** Stop recording */
        worker.postMessage({
          command: 'stop',
          jobId,
        });
        /** destroyAudioContext audioRecorder */
        audioRecorder.port.onmessage = null;
        audioRecorder.disconnect();
        audioContext.close();
        audioContext = undefined;

        audioBlob = new Blob(audioData, { type: 'audio/mpeg' });
        audioBlobUrl = URL.createObjectURL(audioBlob);

        console.log(audioBlobUrl);
      }, 3000);

      // const blob = encodeAudio(buffers, settings); // <11>
      // const url = URL.createObjectURL(blob);

      // const mediaSourceStream = audioContext.createMediaStreamSource(mic);

      // dispatchHomeEvent({ type: HomeActionType.INIT, mic });
    } catch (error) {
      console.log(error);

      console.log('🤫 Dante ➤ startRecording ➤ error', error);
    }
  }

  async function stopRecording() {
    await homeState.recorder.stopRecording(() => {
      const mp3Blob = new Blob([homeState.recorder.getBlob()], {
        type: 'audio/mp3',
      });

      const blobUrl = URL.createObjectURL(mp3Blob);

      dispatchHomeEvent({
        type: HomeActionType.STOP_RECORDING,
        blobUrl,
      });
    });
  }

  async function handleClickNewRecording() {
    dispatchHomeEvent({
      type: HomeActionType.START_NEW_RECORDING,
    });
  }

  const isRecording =
    state === RecorderStatus.Recording || state === RecorderStatus.Paused;

  return (
    <div>
      {state === RecorderStatus.Ready && (
        <InitialView onClick={() => startRecording()} />
      )}
      {isRecording && <RecordingView onClick={() => stopRecording()} />}
      {state === RecorderStatus.Stopped && (
        <RecordFinishedView
          blobUrl={homeState.blobUrl}
          onClickNewRecording={handleClickNewRecording}
        />
      )}
    </div>
  );
}
