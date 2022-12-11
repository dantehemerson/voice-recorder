import { Chronometer } from '@components/atoms';
import { RecorderControls } from '@components/organisms';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { errorStoreAtom } from 'store/error.store';
import styled from 'styled-components';
import { useRecording } from '../../lib/hooks/use-recording.hook';
import { useTimer } from '../../lib/hooks/use-timer.hook';
import { HomeScreen, useHomeState } from './contexts/home.context';
import { RecordFinishedView } from './RecordFinishedView.component';

export function Recorder() {
  const { homeState, dispatch } = useHomeState();
  const recorder = useRecording();
  const timer = useTimer();

  const setError = useSetAtom(errorStoreAtom);

  function initRecording() {
    recorder.clearRecording();
    recorder.initRecording();

    timer.reset();

    recorder.recording.onStart = () => {
      timer.resetAndStart();
    };

    recorder.recording.onStop = sucess => {
      if (sucess) {
        dispatch.recordResult({
          audioBlobUrl: recorder.recording.getAudioBlobUrl(),
        });
      } else {
        dispatch.startNewRecording();
      }
    };

    recorder.recording.onPause = () => {
      timer.stop();
    };

    recorder.recording.onResume = () => {
      timer.start();
    };

    recorder.recording.onSaveSuccess = () => {
      console.log('Sucesss');
      // setMedia(recorder.recording.getMedia());
    };

    recorder.recording.onError = error => {
      setError({
        message: error.name,
        details: error.message,
      });
      dispatch.startNewRecording();
    };

    console.log('recording started');
  }

  useEffect(() => {
    timer.reset();
  }, []);

  async function startRecording() {
    dispatch.startRecording();
    initRecording();
    await recorder.recording.start();
  }

  async function handleStop() {
    dispatch.stopRecording();
    recorder.recording.stop();
    timer.stop();
  }

  async function handleClickNewRecording() {
    timer.reset();
    dispatch.startNewRecording();
  }

  const initialStateShow = () => {
    switch (homeState.screen) {
      case HomeScreen.PREVIEWING:
        return (
          <RecordFinishedView
            blobUrl={homeState.audioBlobUrl || ''}
            onClickNewRecording={handleClickNewRecording}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Wrapper>
      {initialStateShow()}
      {homeState.screen !== HomeScreen.PREVIEWING && (
        <>
          <Chronometer timer={timer} />
          <RecorderControlsWrapper>
            <RecorderControls
              isRecording={homeState.screen === HomeScreen.RECORDING}
              onStartClick={() => startRecording()}
              onPauseClick={() => recorder.recording.pause()}
              onPlayClick={() => recorder.recording.resume()}
              onStopClick={() => handleStop()}
            />
          </RecorderControlsWrapper>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecorderControlsWrapper = styled.div`
  margin-top: 8vh;
`;
