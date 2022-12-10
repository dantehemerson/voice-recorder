import { Button, Card } from '@components/atoms';
import { PlayPauseButton } from '@components/molecules';
import { BACKGROUND_CIRCLE_SIZE } from '@components/organisms/RecorderControls/recorder-controlls.constants';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecorderStatus } from '@lib/recording/enums/recorder-status.enum';
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

  return (
    <Wrapper>
      <ButtonsContainer>
        <BandButton onClick={props.onCancelClick}>
          <FontAwesomeIcon icon={faXmark} color="#F75B47" />
        </BandButton>
        <PlayPauseButton
          status={getStatus()}
          onStartClick={props.onStartClick}
          onPauseClick={handlePlayPause}
          onPlayClick={handlePlayPause}
        />
        <BandButton onClick={props.onStopClick} ok={true}>
          <FontAwesomeIcon icon={faCheck} color="#16C698" />
        </BandButton>
      </ButtonsContainer>
      <BackgroundCircle size={BACKGROUND_CIRCLE_SIZE} />
    </Wrapper>
  );
}

const Wrapper = styled(Card)`
  margin-top: 35px;
  margin-bottom: 35px;
  background-color: #fefefe;
  max-width: 300px;
  position: relative;
  min-width: 300px;
  border-radius: 20px;
  filter: drop-shadow(0px 8px 12px rgb(0 0 0 / 8%));
`;

const BandButton = styled<any>(Button)`
  background: #fefefe;
  filter: drop-shadow(0px 2px 8px rgb(0 0 0 / 10%));
  border-radius: 9px;
  &:hover {
    background: ${props => (props.ok ? '#E7F9F5' : '#FDEEEC')};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;
  padding: 0 20px;
`;

const BackgroundCircle = styled<any>('div')`
  position: absolute;
  left: calc(50% - ${props => props.size / 2 + 3}px);
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
