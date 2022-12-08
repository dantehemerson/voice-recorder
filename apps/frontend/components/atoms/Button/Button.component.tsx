import { ButtonIcon } from '@components/atoms/Button/ButtonIcon.component';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

export function Button(props: ButtonProps) {
  return (
    <StyledButton {...props}>
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
  background-color: #f5f5f5;
  cursor: pointer;
  margin: 10px;
  padding: 5px 10px;
`;
