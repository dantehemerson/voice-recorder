import styled from 'styled-components';

export function Header() {
  return (
    <Wrapper>
      <h1>Voice Recorder</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 50px;

  h1 {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
  }
`;
