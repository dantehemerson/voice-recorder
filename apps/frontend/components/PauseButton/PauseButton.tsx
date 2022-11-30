import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type PauseButtonProps = {
  isPaused: boolean;
  onClick: () => void;
};

export function PauseButton({ isPaused, onClick }: PauseButtonProps) {
  return (
    <Wrapper onClick={() => onClick()}>
      {isPaused ? (
        <FontAwesomeIcon icon={faPlay} size="xl" color="red" />
      ) : (
        <FontAwesomeIcon icon={faPause} size="xl" color="red" />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #f4f4f6;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  margin-left: -74px;
  position: absolute;
  cursor: pointer;
  box-shadow: 0px 0px 3px 0px #525252;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #e6e6e6;
    box-shadow: 0px 0px 3px 0px #525252;
  }
`;
