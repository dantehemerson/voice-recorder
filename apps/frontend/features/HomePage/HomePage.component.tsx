import { SaveRecording } from '@components/organisms';
import { MainLayout } from '@components/templates';
import { HomeContextProvider } from './contexts/home.context';
import { ErrorComponent } from './Error.component';
import { RecorderComponent } from './Recorder.component';
import { useHomePage } from './use-homepage.hook';

export function HomePage() {
  const {
    recording: recordingResult,
    onNewRecording,
    onSaveRecording,
    onStartRecording,
    onDeleteMedia,
    deleteCount,
    onErrorRecording,
  } = useHomePage();

  return (
    <MainLayout>
      <HomeContextProvider>
        <RecorderComponent
          key={deleteCount}
          onNewRecording={onNewRecording}
          onStartRecording={onStartRecording}
          onErrorRecording={onErrorRecording}
        />
      </HomeContextProvider>
      {recordingResult && (
        <SaveRecording
          recordingResult={recordingResult}
          onDeleteMedia={onDeleteMedia}
          onSaveRecording={onSaveRecording}
        />
      )}
      <ErrorComponent />
    </MainLayout>
  );
}
