import clsx from 'clsx';
import React from 'react';
import { RecorderStatus } from '../../contexts/reducers/home-context.reducer';
import styles from './RecordButton.module.scss';

type RecordButtonProps = {
  onClick: (
    newStatus: RecorderStatus.Recording | RecorderStatus.Stopped
  ) => void;
  recording: boolean;
};

export function RecordButton({ recording, onClick }: RecordButtonProps) {
  const handleClick = () => {
    onClick(recording ? RecorderStatus.Stopped : RecorderStatus.Recording);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(styles.recButton, recording && styles.recording)}
    ></div>
  );
}
