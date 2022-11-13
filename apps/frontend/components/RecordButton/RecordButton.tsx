import styles from './RecordButton.module.scss';

type RecordButtonProps = {
  onClick: () => void;
};

export function RecordButton({ onClick }: RecordButtonProps) {
  return (
    <div onClick={() => onClick()} className={styles.recButton}>
      Record
    </div>
  );
}
