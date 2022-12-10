import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

type LogoProps = {};

export function Logo(props: LogoProps) {
  return (
    <Wrapper>
      <div>
        <FontAwesomeIcon icon={faMicrophoneLines} color="white" size="4x" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 50%;
  padding: 10px;
  background: rgb(254, 82, 47);
  background: linear-gradient(
    0deg,
    rgba(245, 174, 25, 1) 0%,
    rgba(254, 82, 45, 1) 69%
  );
  box-sizing: content-box;
  border: 12px solid white;
  filter: drop-shadow(0px 8px 12px rgb(0 0 0 / 8%));

  & > div {
    background: rgb(245, 174, 25);
    width: 140px;
    height: 140px;

    align-items: center;
    justify-content: center;
    display: flex;

    background: linear-gradient(
      0deg,
      rgba(254, 82, 47, 1) 0%,
      rgba(240, 151, 26, 1) 87%
    );
    border-radius: 50%;
  }
`;
