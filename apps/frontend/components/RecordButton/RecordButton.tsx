import styles from './RecordButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

type RecordButtonProps = {
  onClick: () => void;
};

export function RecordButton({ onClick }: RecordButtonProps) {
  return (
    <div onClick={() => onClick()} className={styles.recButton}>
      <FontAwesomeIcon icon={faMicrophone} size="xl" color="white" />
    </div>
  );
}
