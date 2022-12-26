import { RecordingPlayer } from '@components/organisms';
import { MainLayout } from '@components/templates';
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

  return (
    <MainLayout>
      <RecordingPlayer
        url={`${process.env.NEXT_PUBLIC_STORE_URL}/${recording.mediaId}.mp3`}
        onClickNewRecording={handleClickedNewRecording}
      />
    </MainLayout>
  );
}
