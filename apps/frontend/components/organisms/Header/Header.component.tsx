import { Logo } from '@components/atoms';
import styled from 'styled-components';

export function Header() {
  return (
    <Wrapper>
      <Logo />
      <h1>Voice Recorder</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 50px;
  background: #383738;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  padding-left: 30px;
  border-radius: 56px;
  flex-direction: row;
  margin-bottom: 30px;

  h1 {
    font-size: 1.1rem;
    text-align: center;
    color: white;
    font-weight: bold;
  }
`;
