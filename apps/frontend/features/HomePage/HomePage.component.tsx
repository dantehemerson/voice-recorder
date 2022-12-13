import { SaveRecording } from '@components/organisms';
import { MainLayout } from '@components/templates';
import { HomeContextProvider } from './contexts/home.context';
import { ErrorShower } from './ErrorShower.component';
import { Recorder } from './Recorder.component';
import { useHomePage } from './use-homepage.hook';

export function HomePage() {
  const {
    recording,
    onNewRecording,
    onSaveRecording,
    onStartRecording,
    onDeleteMedia,
    deleteCount,
  } = useHomePage();

  return (
    <MainLayout>
      <HomeContextProvider>
        <Recorder
          key={deleteCount}
          onNewRecording={onNewRecording}
          onStartRecording={onStartRecording}
        />
      </HomeContextProvider>
      {recording && (
        <SaveRecording
          recording={recording}
          onDeleteMedia={onDeleteMedia}
          onSaveRecording={onSaveRecording}
        />
      )}
      <ErrorShower />
    </MainLayout>
  );
}
