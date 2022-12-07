import styled from 'styled-components';
import { ErrorShower } from 'views/Home/ErrorShower.component';
import { HomeContextProvider } from '../contexts/home.context';
import { Home } from '../views/Home/Home';

export default function Index() {
  return (
    <HomeContextProvider>
      <Wrapper>
        <Container>
          <Home />
          <ErrorShower />
        </Container>
      </Wrapper>
    </HomeContextProvider>
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
