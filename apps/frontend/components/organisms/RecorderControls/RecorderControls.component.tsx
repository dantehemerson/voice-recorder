import { Button, Card } from '@components/atoms';
import { PlayPauseButton } from '@components/molecules';
import { BACKGROUND_CIRCLE_SIZE } from '@components/organisms/RecorderControls/recorder-controlls.constants';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecorderStatus } from '@lib/recording';
import { useState } from 'react';
import styled from 'styled-components';

type RecorderControlsProps = {
  isRecording: boolean;
  onStartClick?: () => void;
  onPauseClick?: () => void;
  onPlayClick?: () => void;
  onStopClick?: () => void;
  onCancelClick?: () => void;
};

export function RecorderControls(props: RecorderControlsProps) {
  const [isPaused, setIsPaused] = useState(false);

  function handlePlayPause() {
    const pause = !isPaused ? true : false;
    pause ? props.onPauseClick?.() : props.onPlayClick?.();

    setIsPaused(!isPaused);
  }

  function getStatus() {
    if (props.isRecording) {
      return isPaused ? RecorderStatus.PAUSED : RecorderStatus.RECORDING;
    }
    return RecorderStatus.STOPPED;
  }

  function recorderStatusMessage(): string {
    switch (getStatus()) {
      case RecorderStatus.RECORDING:
        return 'Recording...';
      case RecorderStatus.PAUSED:
        return 'Paused';
      case RecorderStatus.STOPPED:
        return 'Ready to record';
    }
  }

  function handleCancelClick() {
    setIsPaused(false);
    props.onCancelClick?.();
  }

  return (
    <>
      <p
        style={{
          fontSize: '14px',
          fontWeight: 500,
          textAlign: 'center',
          color: '#7a8286',
          marginTop: '3vh',
        }}
      >
        {recorderStatusMessage()}
      </p>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ButtonsWrapper isRecording={props.isRecording}>
          <ButtonsContainer>
            <BandButton
              onClick={handleCancelClick}
              className={props.isRecording && 'show'}
              style={{
                left: '20px',
              }}
              title="Cancel recording"
            >
              <FontAwesomeIcon icon={faXmark} color="#F75B47" />
            </BandButton>
            <PlayPauseButton
              status={getStatus()}
              size={BACKGROUND_CIRCLE_SIZE - 20}
              onStartClick={props.onStartClick}
              onPauseClick={handlePlayPause}
              onPlayClick={handlePlayPause}
            />
            <BandButton
              onClick={props.onStopClick}
              ok={true}
              style={{
                right: '20px',
              }}
              title="Stop recording"
              className={props.isRecording && 'show'}
            >
              <FontAwesomeIcon icon={faCheck} color="#16C698" />
            </BandButton>
          </ButtonsContainer>
          <BackgroundCircle size={BACKGROUND_CIRCLE_SIZE} />
        </ButtonsWrapper>
      </div>
    </>
  );
}

const ButtonsWrapper = styled<any>(Card)`
  margin-top: 35px;
  margin-bottom: 35px;
  padding: 4px 0;
  background-color: #fefefe;
  position: relative;
  width: ${props => (props.isRecording ? '260px' : '90px')};
  border-radius: 20px;
  filter: drop-shadow(0px 8px 12px rgb(0 0 0 / 8%));
  transition-property: width;
  transition-duration: 0.3s;
`;

const BandButton = styled<any>(Button).attrs(props => ({
  color: '#fefefe',
}))`
  filter: drop-shadow(0px 2px 8px rgb(0 0 0 / 10%));
  border-radius: 9px;
  position: absolute;
  border: 1px solid #f4f4f4;
  z-index: -1;
  opacity: 0;
  width: 45px;
  &.show {
    opacity: 1;
  }

  &:hover {
    background: ${props => (props.ok ? '#d0ece6' : '#f9e4e1')};
  }
`;

const ButtonsContainer = styled<any>('div')`
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 2;
  padding: 0 20px;
  justify-content: center;
`;

const BackgroundCircle = styled<any>('div')`
  position: absolute;
  left: calc(50% - ${props => props.size / 2}px);
  background: #fefefe;
  top: calc(50% - ${props => props.size / 2}px);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;
