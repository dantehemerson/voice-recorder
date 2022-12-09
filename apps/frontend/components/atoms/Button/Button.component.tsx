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
  background-color: ${props => props.color};
  cursor: pointer;
  padding: 5px 10px;
  outline: none;
  outline: transparent solid 2px;
  border-radius: 0.375rem;
  height: 2rem;
  font-weight: 600;
  color: white;
  transition-duration: 0.2s;
  white-space: nowrap;
  user-select: none;
  padding-inline-start: 0.8rem;
  padding-inline-end: 0.8rem;

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
  }

  &:hover {
    background-color: ${props => darkenColor(props.color)};
  }
`;
