import { Button, Input } from '@components/atoms';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <Button onClick={handleCopy}>
        <FontAwesomeIcon icon={faCopy} />
      </Button>
      {isCopied && <span>Copied!</span>}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
