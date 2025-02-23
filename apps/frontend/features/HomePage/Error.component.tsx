import { Alert, AlertStatus } from '@components/atoms/Alert';
import { errorStoreAtom } from 'store/error.store';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';

export function ErrorComponent() {
  const error = useAtomValue(errorStoreAtom);

  if (!error) {
    return null;
  }

  return (
    <ErroWrapper>
      <Alert
        status={AlertStatus.ERROR}
        title={error.message}
        description={error.details}
      />
    </ErroWrapper>
  );
}

const ErroWrapper = styled.div`
  display: flex;
  padding: 20px 16px;
  justify-content: center;
`;
