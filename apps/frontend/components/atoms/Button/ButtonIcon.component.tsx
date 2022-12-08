import styled, { CSSProperties } from 'styled-components';

type ButtonIconProps = Pick<CSSProperties, 'marginLeft' | 'marginRight'> & {
  children: React.ReactElement;
};

export function ButtonIcon(props: ButtonIconProps) {
  return <Wrapper style={props}>{props.children}</Wrapper>;
}

const Wrapper = styled.span``;
