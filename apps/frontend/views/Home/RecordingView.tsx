import { PauseButton } from '../../components/PauseButton/PauseButton';
import { StopButton } from '../../components/StopButton/StopButton';
import { Timer } from '../../components/Timer/Timer';
import styles from './RecordingView.module.scss';

type RecordingViewProps = {
  onClick: () => void;
};

export function RecordingView({ onClick }: RecordingViewProps) {
  return (
    <div className={styles.RecordingView}>
      <div className={styles.timerContainer}>
        <Timer mm={10} ss={11} hideMs={true} />
      </div>
      <div className={styles.buttonsContainer}>
        <PauseButton onClick={onClick} />
        <StopButton onClick={onClick} />
      </div>
    </div>
  );
}
