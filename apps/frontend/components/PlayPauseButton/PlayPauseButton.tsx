import clsx from 'clsx';
import React from 'react';
import styles from './PlayPauseButton.module.scss';

export type PlayPauseButtonProps = {
  playing: boolean;
};

export function PlayPauseButton({ playing }: PlayPauseButtonProps) {
  return (
    <div className={clsx(styles.playpause, playing && styles.playing)}>
      <div className={styles.button}></div>
    </div>
  );
}
