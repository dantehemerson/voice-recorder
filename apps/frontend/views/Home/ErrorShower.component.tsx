import { Alert, AlertStatus } from '@components/atoms/Alert';
import { errorStoreAtom } from '@lib/store/error.store';
import { useAtomValue } from 'jotai';

export function ErrorShower() {
  const error = useAtomValue(errorStoreAtom);

  if (!error) {
    return null;
  }

  return (
    <Alert
      status={AlertStatus.ERROR}
      title={error.message}
      description={error.details}
    />
  );
}
