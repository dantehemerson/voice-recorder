import { Chronometer } from '@components/atoms';
import { UploadResult } from '@components/organisms';
import { getDownloadAudioUrl } from '@lib/helpers/url.helpers';
import { MediaInfo } from '@lib/recording/interfaces/media-info.interface';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { errorStoreAtom } from 'store/error.store';
import { HomeScreen, useHomeState } from './contexts/home.context';
import { useRecording } from '../../lib/hooks/use-recording.hook';
import { useTimer } from '../../lib/hooks/use-timer.hook';
import { InitialView } from './screens/InitialView';
import { RecordFinishedView } from './screens/RecordFinishedView';
import { RecordingView } from './screens/RecordingView';

export function HomePage() {
  const { homeState, dispatch } = useHomeState();
  const recorder = useRecording();
  const timer = useTimer();
  const [media, setMedia] = useState<MediaInfo>();

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
