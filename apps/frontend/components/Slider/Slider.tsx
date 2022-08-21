import styles from './Slider.module.scss';

export type SliderProps = {
  src: string;
};

export function Slider({ src }: SliderProps) {
  return (
    <audio className={styles.audio} controls>
      <source src={src} type="audio/ogg"></source>
    </audio>
  );
}
