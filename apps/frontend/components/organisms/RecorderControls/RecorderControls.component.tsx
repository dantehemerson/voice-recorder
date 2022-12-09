import { Button, Card } from '@components/atoms';
import { faCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

type RecorderControlsProps = {};

export function RecorderControls(props: RecorderControlsProps) {
  return (
    <Wrapper>
      <ButtonsContainer>
        <Button>
          <FontAwesomeIcon icon={faDeleteLeft} color="#ea8071" />
        </Button>

        <Button>
          <FontAwesomeIcon
            icon={faCheck}
            // color="#6ed6bd"
            color="#43be9f"
          />
        </Button>
      </ButtonsContainer>

      <BackgroundCircle size={100} />
    </Wrapper>
  );
}

const Wrapper = styled(Card)`
  margin-top: 100px;
  background-color: #fefefe;
  max-width: 300px;
  position: relative;
  min-width: 250px;
  border-radius: 20px;
  filter: drop-shadow(5px 5px 10px black);
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
  left: calc(50% - ${props => props.size / 2}px);
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
