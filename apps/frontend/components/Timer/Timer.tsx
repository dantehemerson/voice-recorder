import styles from './Timer.module.scss';

export type TimerProps = {
  /** Should hide */
  hideMs?: boolean;
  mm: number;
  ss: number;
  ms?: number;
};

export function Timer({ hideMs = false, mm, ss, ms }: TimerProps) {
  return (
    <div className={styles.container}>
      <div>{mm?.toString().padStart(2, '0')}</div>
      <span>:</span>
      <div>{ss?.toString().padStart(2, '0')}</div>
      {!hideMs && (
        <>
          <span>:</span>
          <div>{ms?.toString().padStart(3, '0')}</div>
        </>
      )}
    </div>
  );
}
