import { CopyInput } from '@components/molecules';

type UploadResultProps = {
  url: string;
};

export function UploadResult(props: UploadResultProps) {
  return (
    <div>
      <CopyInput value={props.url} />
    </div>
  );
}
