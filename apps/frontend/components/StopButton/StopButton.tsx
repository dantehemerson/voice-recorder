import styles from './StopButton.module.scss';

type StopButtonProps = {
  onClick: () => void;
};

export function StopButton({ onClick }: StopButtonProps) {
  return (
    <div onClick={() => onClick()} className={styles.recButton}>
      Stop
    </div>
  );
}
