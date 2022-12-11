import { Button } from '@components/atoms';
import { faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

type SocialShareProps = {};

export function SocialShare(props: SocialShareProps) {
  return (
    <Wrapper>
      <Button>
        <FontAwesomeIcon icon={faFaceAngry} />
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const StyledButton = styled(Button)``;
