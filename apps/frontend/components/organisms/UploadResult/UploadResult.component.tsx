import { Button } from '@components/atoms';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { CopyInput } from '@components/molecules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '@components/atoms';

type UploadResultProps = {
  url: string;
};

export function UploadResult(props: UploadResultProps) {
  return (
    <Card>
      <CopyInput value={props.url} />
      <Button leftIcon={<FontAwesomeIcon icon={faDownload} />}>Download</Button>
      <Button>Delete</Button>
    </Card>
  );
}
