import { SaveRecording, UploadResult } from '@components/organisms';
import { MainLayout } from '@components/templates';
import { getDownloadAudioUrl } from '@lib/helpers/url.helpers';
import { MediaInfo } from '@lib/recording/interfaces/media-info.interface';
import { useState } from 'react';
import { HomeContextProvider } from './contexts/home.context';
import { ErrorShower } from './ErrorShower.component';
import { Recorder } from './Recorder.component';

export function HomePage() {
  const [media, setMedia] = useState<MediaInfo>({
    mediaId: '5f9b5b0c-1b1a-4b1a-9c1a-1b1a1b1a1b1a',
    ownerToken: '5f9b5b0c-1b1a-4b1a-9c1a-1b1a1b1a1b1a',
  });

  return (
    <MainLayout>
      <HomeContextProvider>
        <Recorder />
      </HomeContextProvider>
      {false && <SaveRecording recording={undefined} />}
      {media && <UploadResult url={getDownloadAudioUrl(media.mediaId)} />}
      <ErrorShower />
    </MainLayout>
  );
}
