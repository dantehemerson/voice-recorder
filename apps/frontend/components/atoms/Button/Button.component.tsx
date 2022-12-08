import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  background-color: #f5f5f5;
`;
