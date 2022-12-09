import { Button, Card } from '@components/atoms';
import { PlayPauseButton } from '@components/molecules';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type RecorderControlsProps = {};

export function RecorderControls(props: RecorderControlsProps) {
  return (
    <Wrapper>
      <ButtonsContainer>
        <BandButton>
          <FontAwesomeIcon icon={faXmark} color="#F75B47" />
        </BandButton>
        <PlayPauseButton />
        <BandButton ok={true}>
          <FontAwesomeIcon icon={faCheck} color="#16C698" />
        </BandButton>
      </ButtonsContainer>

      <BackgroundCircle size={100} />
    </Wrapper>
  );
}

const Wrapper = styled(Card)`
  margin-top: 35px;
  margin-bottom: 35px;
  background-color: #fefefe;
  max-width: 300px;
  position: relative;
  min-width: 250px;
  border-radius: 20px;
  filter: drop-shadow(0px 8px 12px rgb(0 0 0 / 8%));
`;

const BandButton = styled<any>(Button)`
  background: #fefefe;
  filter: drop-shadow(0px 2px 8px rgb(0 0 0 / 10%));
  border-radius: 9px;
  &:hover {
    background: ${props => (props.ok ? '#E7F9F5' : '#FDEEEC')};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;
  padding: 0 20px;
`;

const BackgroundCircle = styled<any>('div')`
  position: absolute;
  left: calc(50% - ${props => props.size / 2 + 3}px);
  background: #fefefe;
  top: calc(50% - ${props => props.size / 2}px);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  &:after {
    content: '';
    border-radius: 50%;
    width: ${props => props.size - 30}px;
    height: ${props => props.size - 30}px;
    background: #d6e2ea;
  }
`;
