import { Button, Input } from '@components/atoms';
import { useState } from 'react';
import styled from 'styled-components';

type CopyInputProps = {
  value: string;
};

export function CopyInput(props: CopyInputProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!isCopied) {
      navigator.clipboard.writeText(props.value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const selectText = event => {
    event.target.select();
  };

  return (
    <Wrapper>
      <StyledInput
        onClick={event => selectText(event)}
        value={props.value}
        readOnly
      />
      <StyledButton onClick={handleCopy}>
        {isCopied ? 'Copied!' : 'Copy'}
      </StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledInput = styled(Input)`
  border-right-width: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  width: 82px;
`;
