import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  padding?: string;
};

export function Card({ ...props }: CardProps) {
  return <Wrapper {...props}>{props.children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  background: white;
  border-radius: 0.875rem;
  padding: 0.5rem 0.5rem;
  flex-direction: 'column';
  justify-content: 'center';
  align-items: 'center';
  word-wrap: break-word;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;
