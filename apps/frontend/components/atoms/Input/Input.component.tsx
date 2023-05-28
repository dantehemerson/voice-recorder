import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { NexaFont } from '~/fonts';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  outline: transparent solid 2px;
  font-family: ${NexaFont.style.fontFamily};
  color: #5a6a73;
  outline-offset: 0px;
  border-radius: 0.875rem;
  height: 2.5rem;
  font-size: 0.9rem;
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  transition: 0.2s ease-in-out;
  background: #d7e4eb;
  border-width: 2px;
  border-color: #aec1cb;

  &:focus-visible {
    z-index: 1;
    border-color: #aec1cb;
    box-shadow: 0 0 0 2px rgb(5 145 255 / 10%);
  }
`;
