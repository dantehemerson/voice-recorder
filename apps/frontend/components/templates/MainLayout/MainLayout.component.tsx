import { Header } from '@components/organisms';
import React from 'react';
import styled from 'styled-components';

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout(props: MainLayoutProps) {
  return (
    <Container>
      <Wrapper>
        <Header />
        {props.children}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #dedede;
  margin-left: auto;
  margin-right: auto;
  max-width: 688px;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(55, 65, 81, 1);
  width: 100%;
`;

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
`;
