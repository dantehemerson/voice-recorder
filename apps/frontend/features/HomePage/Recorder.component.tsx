import { Chronometer } from '@components/atoms';
import { RecorderControls, RecordingPlayer } from '@components/organisms';
import { useRecording, useTimer } from '@lib/hooks';
import { Recording } from '@lib/recording';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import styled from 'styled-components';
import { HomeScreen, useHomeState } from './contexts/home.context';
import { errorStoreAtom } from '@features/HomePage/Error.component';

type RecorderProps = {
  onNewRecording: (recording: Recording) => void;
  onStartRecording: (toHome?: boolean) => void;
  onErrorRecording: (error: Error) => void;
};

export function RecorderComponent(props: RecorderProps) {
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

    recorder.recording.onStop = (sucess) => {
      if (sucess) {
        dispatch.recordResult({
          audioBlobUrl: recorder.recording.getAudioBlobUrl(),
        });
      } else {
        dispatch.startNewRecording();
      }

      props.onNewRecording?.(recorder.recording);
    };

    recorder.recording.onPause = () => {
      timer.stop();
    };

    recorder.recording.onResume = () => {
      timer.start();
    };

    recorder.recording.onError = (error) => {
      setError({
        message: error.name,
        details: error.message,
      });
      dispatch.startNewRecording();
    };
  }

  useEffect(() => {
    timer.reset();
    dispatch.startNewRecording();

    return () => {
      try {
        recorder.recording.abort();
        timer.reset();
        recorder.clearRecording();
      } catch {}
    };
  }, []);

  async function startRecording() {
    try {
      // Init Recorder
      initRecording();

      // Start recording
      await recorder.recording.start();

      // Change UI state:
      dispatch.startRecording();

      props.onStartRecording();
    } catch (error) {
      console.error('Error while starting recording', error);
      console.error(error);

      props.onErrorRecording(error as Error);
    }
  }

  async function handleStop() {
    dispatch.stopRecording();
    recorder.recording.stop();
    timer.stop();
  }

  async function handleClickNewRecording() {
    timer.reset();
    dispatch.startNewRecording();
    props.onStartRecording(true);
  }

  function handleClickCancel() {
    recorder.recording.abort();
    timer.reset();
    recorder.clearRecording();
    dispatch.startNewRecording();
  }

  return (
    <Wrapper>
      {homeState.screen === HomeScreen.PREVIEWING ? (
        <RecordingPlayer
          url={homeState.audioBlobUrl || ''}
          onClickNewRecording={handleClickNewRecording}
        />
      ) : (
        <>
          <Chronometer
            timer={timer}
            style={{
              marginTop: '4vh',
            }}
          />
          <RecorderControlsWrapper>
            <RecorderControls
              isRecording={homeState.screen === HomeScreen.RECORDING}
              onStartClick={() => startRecording()}
              onPauseClick={() => recorder.recording.pause()}
              onPlayClick={() => recorder.recording.resume()}
              onStopClick={() => handleStop()}
              onCancelClick={handleClickCancel}
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
  margin-top: 5vh;
  width: 100%;
`;
