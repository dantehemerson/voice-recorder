import { RecordButton } from '../../components/RecordButton/RecordButton';

type InitialViewProps = {
  onClick: () => void;
};

export function InitialView({ onClick }: InitialViewProps) {
  return (
    <div style={{ border: '1px solid red;' }} className="InitialView">
      <RecordButton onClick={onClick} />
    </div>
  );
}
