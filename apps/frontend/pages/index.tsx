import { HomeContextProvider } from '../contexts/home.context';
import { Home } from '../views/Home/Home';
import styles from './index.module.scss';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <HomeContextProvider>
      <div className={styles.page}>
        <div className="wrapper">
          <div className="container">
            <Home />
          </div>
        </div>
      </div>
    </HomeContextProvider>
  );
}

export default Index;
