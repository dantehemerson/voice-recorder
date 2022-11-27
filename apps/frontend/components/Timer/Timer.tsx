import styled from 'styled-components';

export type TimerProps = {
  /** Should hide */
  hideMs?: boolean;
  mm: number;
  ss: number;
  ms?: number;
};

export function Timer({ hideMs = false, mm, ss, ms }: TimerProps) {
  return (
    <Wrapper>
      <div>{mm?.toString().padStart(2, '0')}</div>
      <span>:</span>
      <div>{ss?.toString().padStart(2, '0')}</div>
      {!hideMs && (
        <>
          <span>:</span>
          <div>{ms?.toString().padStart(3, '0')}</div>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  font-weight: 400;
`;
