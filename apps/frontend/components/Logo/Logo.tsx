import styles from './PauseButton.module.scss';

type LogoProps = {
  onClick: () => void;
};

export function Logo({ onClick }: LogoProps) {
  return (
    <div
      style={{ marginLeft: '-74px', position: 'absolute' }}
      onClick={() => onClick()}
      className={styles.pauseButton}
    ></div>
  );
}
