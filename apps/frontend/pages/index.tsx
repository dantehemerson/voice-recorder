import { RecordButton } from '../components/RecordButton/RecordButton';
import styles from './index.module.scss';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <RecordButton />
        </div>
      </div>
    </div>
  );
}

export default Index;
