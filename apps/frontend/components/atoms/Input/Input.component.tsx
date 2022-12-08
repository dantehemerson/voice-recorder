import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  margin-top: 50px;
`;
