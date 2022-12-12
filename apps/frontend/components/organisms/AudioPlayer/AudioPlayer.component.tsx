import { Card } from '@components/atoms';
import { PlayPauseButton, SliderTimer } from '@components/molecules';
import { useAudioPlayer } from '@lib/hooks/use-audio-player.hook';
import { RecorderStatus } from '@lib/recording/enums/recorder-status.enum';
import styled from 'styled-components';

type AudioPlayerProps = {
  src: string;
};

export function AudioPlayer(props: AudioPlayerProps) {
  const {
    audioRef,
    isPlaying,
    pause,
    play,
    duration,
    currentTime,
    setCurrentTime,
  } = useAudioPlayer();

  return (
    <Wrapper>
      <audio ref={audioRef} src={props.src} />
      <ButtonWraper>
        <PlayPauseButton
          status={isPlaying ? RecorderStatus.RECORDING : RecorderStatus.PAUSED}
          onPauseClick={() => pause()}
          onPlayClick={() => play()}
          iconSize="sm"
        />
      </ButtonWraper>
      <SliderTimer
        onChangePosition={newPosition => setCurrentTime(newPosition)}
        currentTime={currentTime}
        duration={duration}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #cecdcd;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ButtonWraper = styled.div`
  display: flex;
  margin-right: 12px;
`;
