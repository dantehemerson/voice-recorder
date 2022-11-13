import { StopButton } from '../../components/StopButton/StopButton';

type RecordingViewProps = {
  onClick: () => void;
};

export function RecordingView({ onClick }: RecordingViewProps) {
  return (
    <div style={{ border: '1px solid red;' }} className="InitialView">
      <StopButton onClick={onClick} />
    </div>
  );
}
