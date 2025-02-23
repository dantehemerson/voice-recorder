import { Alert, AlertStatus } from '@components/atoms/Alert';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import { atom } from 'jotai';

export type ErrorStore = {
  message: string;
  details: string;
};

export const errorStoreAtom = atom(undefined as ErrorStore);

export function ErrorComponent() {
  const error = useAtomValue(errorStoreAtom);

  if (!error) {
    return null;
  }

  return (
    <ErroWrapper key="error-component">
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
