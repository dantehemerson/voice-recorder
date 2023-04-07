import { Button, Stack } from '@components/atoms';
import { Alert, AlertStatus } from '@components/atoms/Alert';
import { MainLayout } from '@components/templates';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  function handleClickGoHome() {
    router.push('/');
  }

  return (
    <MainLayout>
      <Stack justifyContent="center" hSpacing={10}>
        <Alert
          title="Not Found"
          description="Sorry, the requested media could not be found. It may have expired or been deleted."
          status={AlertStatus.ERROR}
        />
      </Stack>
      <br />
      <Stack justifyContent="center">
        <Button
          onClick={handleClickGoHome}
          leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
        >
          Go Home
        </Button>
      </Stack>
    </MainLayout>
  );
}
