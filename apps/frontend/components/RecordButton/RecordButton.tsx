import clsx from 'clsx';
import React from 'react';
import styles from './RecordButton.module.scss';

export function RecordButton() {
  const [isRecording, setIsRecording] = React.useState(false);

  return (
    <div
      onClick={() => setIsRecording(!isRecording)}
      className={clsx(styles.recButton, isRecording && styles.recording)}
    ></div>
  );
}
