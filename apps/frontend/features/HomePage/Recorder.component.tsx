import { Card, Chronometer } from '@components/atoms';
import { RecorderControls } from '@components/organisms';
import { Recording } from '@lib/recording';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { errorStoreAtom } from 'store/error.store';
import styled from 'styled-components';
import { useRecording } from '../../lib/hooks/use-recording.hook';
import { useTimer } from '../../lib/hooks/use-timer.hook';
import { HomeScreen, useHomeState } from './contexts/home.context';
import { RecordFinishedView } from './RecordFinishedView.component';

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

  const initialStateShow = () => {
    switch (homeState.screen) {
      case HomeScreen.PREVIEWING:
        return (
          <RecordFinishedView
            url={homeState.audioBlobUrl || ''}
            onClickNewRecording={handleClickNewRecording}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Wrapper
      key="otraCosas"
      showBg={homeState.screen === HomeScreen.PREVIEWING}
    >
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

const Wrapper = styled<any>(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ showBg }) =>
    showBg ? '#f5f5f5' : 'transparent'} !important;
  ${({ showBg }) => !showBg && ' box-shadow: none;'};
  padding: 1rem;
`;

const RecorderControlsWrapper = styled.div`
  margin-top: 8vh;
`;
