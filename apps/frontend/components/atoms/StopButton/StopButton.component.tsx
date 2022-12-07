import { faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type StopButtonProps = {
  onClick: () => void;
};

export function StopButton({ onClick }: StopButtonProps) {
  return (
    <Wrapper onClick={() => onClick()}>
      <FontAwesomeIcon icon={faStop} size="2x" color="white" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #ff3341;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 3px 0px #525252;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #ed2e3a;
    box-shadow: 0px 0px 3px 0px #525252;
  }
`;
