import { Slider } from '../../components/Slider/Slider';
import styles from './RecordFinishedView.module.scss';

type RecordFinishedViewProps = {
  blobUrl: string;
  onClickNewRecording: () => void;
};

export function RecordFinishedView({
  blobUrl,
  onClickNewRecording,
}: RecordFinishedViewProps) {
  return (
    <div className={styles.recordFinishedView}>
      <Slider src={blobUrl} />
      <div onClick={onClickNewRecording} className={styles.newRecordingBtn}>
        Start a new recording
      </div>
    </div>
  );
}
