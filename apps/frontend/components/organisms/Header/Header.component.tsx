import { Logo } from '@components/atoms';
import styled from 'styled-components';

export function Header() {
  return (
    <Wrapper>
      <h1>Voice Recorder</h1>
      <Logo />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;

  h1 {
    font-size: 1.1rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 40px;
  }
`;
