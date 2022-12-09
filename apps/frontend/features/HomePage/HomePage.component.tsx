import { SaveRecording, UploadResult } from '@components/organisms';
import { MainLayout } from '@components/templates';
import { HomeContextProvider } from '@features/HomePage/contexts/home.context';
import { ErrorShower } from '@features/HomePage/ErrorShower.component';
import { Recorder } from '@features/HomePage/Recorder.component';
import { getDownloadAudioUrl } from '@lib/helpers/url.helpers';
import { MediaInfo } from '@lib/recording/interfaces/media-info.interface';
import { useState } from 'react';

export function HomePage() {
  const [media, setMedia] = useState<MediaInfo>();

  return (
    <MainLayout>
      <HomeContextProvider>
        <Recorder />
      </HomeContextProvider>
      {false && <SaveRecording />}
      {media && <UploadResult url={getDownloadAudioUrl(media.mediaId)} />}
      <ErrorShower />
    </MainLayout>
  );
}
