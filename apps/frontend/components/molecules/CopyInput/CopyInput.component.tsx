import { Button, Input } from '@components/atoms';
import { useState } from 'react';
import styled from 'styled-components';

type CopyInputProps = {
  value: string;
};

export function CopyInput(props: CopyInputProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.value);
    setIsCopied(true);
  };

  return (
    <Wrapper>
      <Input value={props.value} readOnly />
      <Button onClick={handleCopy}>Copy</Button>
      {isCopied && <span>Copied!</span>}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
