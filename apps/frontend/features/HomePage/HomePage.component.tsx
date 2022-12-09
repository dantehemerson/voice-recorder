import {
  RecorderControls,
  SaveRecording,
  UploadResult,
} from '@components/organisms';
import { MainLayout } from '@components/templates';
import { getDownloadAudioUrl } from '@lib/helpers/url.helpers';
import { MediaInfo } from '@lib/recording/interfaces/media-info.interface';
import { useState } from 'react';
import { HomeContextProvider } from './contexts/home.context';
import { ErrorShower } from './ErrorShower.component';
import { Recorder } from './Recorder.component';

export function HomePage() {
  const [media, setMedia] = useState<MediaInfo>();

  return (
    <MainLayout>
      <HomeContextProvider>
        <Recorder />
      </HomeContextProvider>
      <RecorderControls />
      {false && <SaveRecording recording={undefined} />}
      {media && <UploadResult url={getDownloadAudioUrl(media.mediaId)} />}
      <ErrorShower />
    </MainLayout>
  );
}
