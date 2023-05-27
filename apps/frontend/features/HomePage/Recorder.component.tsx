import { Chronometer } from '@components/atoms';
import { RecorderControls, RecordingPlayer } from '@components/organisms';
import { useRecording, useTimer } from '@lib/hooks';
import { Recording } from '@lib/recording';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { errorStoreAtom } from 'store/error.store';
import styled from 'styled-components';
import { HomeScreen, useHomeState } from './contexts/home.context';

type RecorderProps = {
  onNewRecording: (recording: Recording) => void;
  onStartRecording: (toHome?: boolean) => void;
};

export function Recorder(props: RecorderProps) {
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

      props.onNewRecording?.(recorder.recording);
    };

    recorder.recording.onPause = () => {
      timer.stop();
    };

    recorder.recording.onResume = () => {
      timer.start();
    };

    recorder.recording.onError = error => {
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
  }, []);

  async function startRecording() {
    dispatch.startRecording();
    initRecording();
    props.onStartRecording();
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
              marginTop: '50px',
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
  margin-top: 10px;
  width: 100%;
`;
