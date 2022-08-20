import clsx from 'clsx';
import React from 'react';
import styles from './RecordButton.module.scss';

type RecordButtonProps = {
  stopped: boolean;
};

export function RecordButton({ stopped }: RecordButtonProps) {
  return (
    <div
      // onClick={() => setIsRecording(!isRecording)}
      className={clsx(styles.recButton, stopped && styles.recording)}
    ></div>
  );
}
