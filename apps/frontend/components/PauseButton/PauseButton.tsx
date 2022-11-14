import { faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PauseButton.module.scss';

type PauseButtonProps = {
  onClick: () => void;
};

export function PauseButton({ onClick }: PauseButtonProps) {
  return (
    <div
      style={{ marginLeft: '-74px', position: 'absolute' }}
      onClick={() => onClick()}
      className={styles.pauseButton}
    >
      <FontAwesomeIcon icon={faPause} size="xl" color="red" />
    </div>
  );
}
