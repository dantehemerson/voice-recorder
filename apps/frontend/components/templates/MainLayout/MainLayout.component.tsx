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
  background-color: #d7e4eb;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  /* margin-top: 5vh; */
  width: 100%;
  max-width: 600px;
  height: fit-content;
`;
