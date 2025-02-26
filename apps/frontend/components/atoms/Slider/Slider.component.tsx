import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface SliderProps extends Omit<InputHTMLAttributes<any>, 'onChange'> {
  value?: number;
  onChange?: (newValue: number) => void;
}

export function Slider({ min = 0, ...props }: SliderProps) {
  return (
    <Wrapper>
      <StyledSlider
        type="range"
        {...props}
        min={min}
        onChange={(e) => props.onChange?.(Number(e.target.value))}
      ></StyledSlider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 8px 0;
  justify-content: center;
  align-items: center;
`;

const StyledSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #d9e0e7;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 25px;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: #9aabac;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: #9aabac;
    cursor: pointer;
  }
`;
