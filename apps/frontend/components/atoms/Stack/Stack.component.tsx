import React from 'react';
import styled from 'styled-components';

type StackProps = {
  children: React.ReactNode;
  hSpacing?: number;
  vSpacing?: number;
  width?: string;
  marginTop?: string;
  marginBottom?: string;
};

export function Stack({
  hSpacing = 0,
  vSpacing = 0,
  children,
  ...props
}: StackProps) {
  return (
    <Wrapper
      style={{
        marginInlineStart: hSpacing,
        ...props,
      }}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;
