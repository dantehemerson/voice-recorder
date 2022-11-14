import { RecordButton } from '../../components/RecordButton/RecordButton';
import styles from './InitialView.module.scss';

type InitialViewProps = {
  onClick: () => void;
};

export function InitialView({ onClick }: InitialViewProps) {
  return (
    <div className={styles.InitialView}>
      <div style={{ height: '50px' }}></div>
      <RecordButton onClick={onClick} />
    </div>
  );
}
