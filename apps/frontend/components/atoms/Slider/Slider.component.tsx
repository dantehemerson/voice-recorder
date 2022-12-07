import styled from 'styled-components';

export type SliderProps = {
  src: string;
};

export function Slider({ src }: SliderProps) {
  return (
    <Audio controls>
      <source src={src} type="audio/ogg"></source>
    </Audio>
  );
}

const Audio = styled.audio`
  width: 100%;

  &::-webkit-media-controls-panel {
    background-color: white;
  }

  &::-webkit-media-controls-current-time-display {
    color: black;
  }
`;
