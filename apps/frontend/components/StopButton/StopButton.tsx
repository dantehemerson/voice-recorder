import { faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './StopButton.module.scss';

type StopButtonProps = {
  onClick: () => void;
};

export function StopButton({ onClick }: StopButtonProps) {
  return (
    <div onClick={() => onClick()} className={styles.stopButton}>
      <FontAwesomeIcon icon={faStop} size="2x" color="white" />
    </div>
  );
}
