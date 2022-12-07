import { Alert, AlertStatus } from '@components/atoms/Alert';
import { useErrorStore } from '@lib/hooks/use-error-store.hook';

export function ErrorShower() {
  const { error } = useErrorStore();

  console.log('Rendering ErrorShower');
  if (!error) {
    return;
  }

  return (
    <Alert
      status={AlertStatus.ERROR}
      title={error.message}
      description={error.details}
    />
  );
}
