import clsx from 'clsx';
import React from 'react';
import { RecorderStatus } from '../../contexts/reducers/home-context.reducer';
import styles from './PlayPauseButton.module.scss';

export type PlayPauseButtonProps = {
  paused: boolean;
  onClick: (newStatus: RecorderStatus) => void;
};

export function PlayPauseButton({ onClick, paused }: PlayPauseButtonProps) {
  const handleClick = () => {
    onClick(paused ? RecorderStatus.Recording : RecorderStatus.Paused);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(styles.playpause, paused && styles.playing)}
    >
      <div className={styles.button}></div>
    </div>
  );
}
