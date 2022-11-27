import styled from 'styled-components';
import { HomeContextProvider } from '../contexts/home.context';
import { Home } from '../views/Home/Home';

export default function Index() {
  return (
    <HomeContextProvider>
      <div>
        <Wrapper>
          <Container>
            <Home />
          </Container>
        </Wrapper>
      </div>
    </HomeContextProvider>
  );
}

const Container = styled.div`
  background-color: red;
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
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
