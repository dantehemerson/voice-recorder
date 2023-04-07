import { RecordingPlayer, UploadResult } from '@components/organisms';
import { MainLayout } from '@components/templates';
import { deleteRecording } from '@lib/services/recording.service';
import { useRouter } from 'next/router';
import { MediaInfoDto } from '@voice-recorder/shared-types';

type RecordingPageProps = {
  media: MediaInfoDto;
};

export function RecordingPage({ media }: RecordingPageProps) {
  console.log(media);
  const router = useRouter();

  async function handleClickedNewRecording() {
    router.push('/');
  }

  async function handleDeleteMedia() {
    try {
      await deleteRecording(media.mediaId);
    } catch (error) {
      console.error('Error deleting recording', error);
    } finally {
      router.push('/');
    }
  }

  return (
    <MainLayout>
      <RecordingPlayer
        url={`${process.env.NEXT_PUBLIC_STORE_URL}/${media.mediaId}.mp3`}
        onClickNewRecording={handleClickedNewRecording}
      />
      <UploadResult mediaId={media.mediaId} onClickDelete={handleDeleteMedia} />
    </MainLayout>
  );
}
