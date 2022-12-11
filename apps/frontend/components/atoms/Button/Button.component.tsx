import { ButtonIcon } from '@components/atoms/Button/ButtonIcon.component';
import { darkenColor } from '@lib/helpers/colors';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  color?: string;
};

export function Button(props: ButtonProps) {
  return (
    <StyledButton {...props} color={props.color || '#242424'}>
      {props.leftIcon && (
        <ButtonIcon marginRight="10px">{props.leftIcon}</ButtonIcon>
      )}
      {props.children}
      {props.rightIcon && (
        <ButtonIcon marginLeft="10px">{props.rightIcon}</ButtonIcon>
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: ${props => props.color};
  cursor: pointer;
  outline: none;
  outline: transparent solid 2px;
  border-radius: 0.375rem;
  height: 2.5rem;
  font-weight: 600;
  color: white;
  transition-duration: 0.2s;
  white-space: nowrap;
  user-select: none;
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }

  &:hover {
    background: ${props => darkenColor(props.color)};
  }
`;
