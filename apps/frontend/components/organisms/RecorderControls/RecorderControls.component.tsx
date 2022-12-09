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

      <BackgroundCircle size={50}>
        <div></div>
      </BackgroundCircle>
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
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;
  padding: 0 20px;
`;

const circleOverflow = 50;
const BackgroundCircle = styled<any>('div')`
  display: flex;
  border: 1px solid gray;
  position: relative;
  margin-left: ${circleOverflow / 2 + 5}px;
  margin-right: ${circleOverflow / 2 + 5}px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  & > div {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background: white;
    width: ${props => props.size + circleOverflow}px;
    height: ${props => props.size + circleOverflow}px;
    position: absolute;
    border-radius: 50%;
    z-index: -20px;
    left: -${circleOverflow / 2}px;
    top: -${circleOverflow / 2}px;
  }
`;
