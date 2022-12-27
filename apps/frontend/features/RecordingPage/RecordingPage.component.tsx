import { RecordingPlayer, UploadResult } from '@components/organisms';
import { MainLayout } from '@components/templates';
import { useRouter } from 'next/router';

type RecordingPageProps = {
  recording: any;
};

export function RecordingPage({ recording }: RecordingPageProps) {
  const router = useRouter();

  async function handleClickedNewRecording() {
    router.push('/');
  }

  async function handleDeleteMedia() {
    console.log('delete');
  }

  return (
    <MainLayout>
      <RecordingPlayer
        url={`${process.env.NEXT_PUBLIC_STORE_URL}/${recording.mediaId}.mp3`}
        onClickNewRecording={handleClickedNewRecording}
      />
      <UploadResult
        mediaId={recording.mediaId}
        onClickDelete={handleDeleteMedia}
      />
    </MainLayout>
  );
}
