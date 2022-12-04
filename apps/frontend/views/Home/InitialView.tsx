import styled from 'styled-components';
import { RecordButton } from '../../components/RecordButton/RecordButton.component';

type InitialViewProps = {
  onClick: () => void;
};

export function InitialView({ onClick }: InitialViewProps) {
  return (
    <Container>
      <div style={{ height: '50px' }}></div>
      <RecordButton onClick={onClick} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;
