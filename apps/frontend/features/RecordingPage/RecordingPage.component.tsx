import { RecordingPlayer, UploadResult } from '@components/organisms';
import { MainLayout } from '@components/templates';
import { getDownloadAudioUrl } from '@lib/helpers/url.helpers';
import { getRecordingDownloadUrl } from '@lib/services/recording.service';
import { useRouter } from 'next/router';
import React from 'react';

type RecordingPageProps = {
  recording: any;
};

export function RecordingPage({ recording }: RecordingPageProps) {
  const router = useRouter();

  async function handleClickedNewRecording() {
    router.push('/');
  }

  async function handleDeleteMedia() {}

  async function handleClickDownload() {
    try {
      const { url } = await getRecordingDownloadUrl(recording.mediaId);

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.style.display = 'none';
      anchor.setAttribute('download', `${recording.mediaId}.mp3`);
      anchor.setAttribute('target', '_blank');

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error('Error downloading file', error);
    }
  }

  return (
    <MainLayout>
      <RecordingPlayer
        url={`${process.env.NEXT_PUBLIC_STORE_URL}/${recording.mediaId}.mp3`}
        onClickNewRecording={handleClickedNewRecording}
      />
      <UploadResult
        url={getDownloadAudioUrl(recording.mediaId)}
        onClickDelete={handleDeleteMedia}
        onClickDownload={handleClickDownload}
      />
    </MainLayout>
  );
}
