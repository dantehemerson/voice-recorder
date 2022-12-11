import {
  faMicrophone,
  faPause,
  faPlay,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecorderStatus } from '@lib/recording/enums/recorder-status.enum';
import styled from 'styled-components';

const iconMap: Record<RecorderStatus, IconDefinition> = {
  [RecorderStatus.PAUSED]: faPlay,
  [RecorderStatus.RECORDING]: faPause,
  [RecorderStatus.STOPPED]: faMicrophone,
  [RecorderStatus.STARTING]: faPlay,
};

type PlayPauseButtonProps = {
  status: RecorderStatus;
  size?: number;
  iconSize?: 'xs' | 'sm' | 'lg' | 'xl';
  onStartClick?: () => void;
  onPauseClick?: () => void;
  onPlayClick?: () => void;
};

export function PlayPauseButton({
  status = RecorderStatus.STOPPED,
  size = 40,
  iconSize = 'xl',
  ...props
}: PlayPauseButtonProps) {
  const icon = iconMap[status];

  if (!icon) {
    throw new Error('Invalid status');
  }

  function handleClick() {
    switch (status) {
      case RecorderStatus.STOPPED:
        props.onStartClick?.();
        break;
      case RecorderStatus.RECORDING:
        props.onPauseClick?.();
        break;
      case RecorderStatus.STARTING:
      case RecorderStatus.PAUSED:
        props.onPlayClick?.();
        break;
      default:
        break;
    }
  }

  function getButtonTitle() {
    switch (status) {
      case RecorderStatus.STOPPED:
        return 'Start recording';
      case RecorderStatus.RECORDING:
        return 'Pause recording';
      case RecorderStatus.STARTING:
      case RecorderStatus.PAUSED:
        return 'Resume recording';
      default:
        return '';
    }
  }

  return (
    <Wrapper size={size}>
      <RecordingButton
        onClick={handleClick}
        size={size}
        title={getButtonTitle()}
      >
        <Icon icon={icon} size={iconSize} color="#232323" />
      </RecordingButton>
    </Wrapper>
  );
}

const Wrapper = styled<any>('div')`
  position: relative;
  width: ${props => props.size}px;
  height: 50px;
`;

const RecordingButton = styled<any>('div')`
  position: absolute;
  background: #d6e2ea;
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  left: calc(50% - ${props => props.size / 2}px);
  top: calc(50% - ${props => props.size / 2}px);
  transition: 0.2s;

  &:hover {
    background: #c4d4e0;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 2px;
`;
