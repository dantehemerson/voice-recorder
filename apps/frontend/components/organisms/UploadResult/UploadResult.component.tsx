import { Button, Card, Stack } from '@components/atoms';
import { CopyInput, SocialShare } from '@components/molecules';
import {
  faCircleDown,
  faDownload,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type UploadResultProps = {
  url: string;
};

export function UploadResult(props: UploadResultProps) {
  return (
    <Wrapper>
      <Title>Share Recording:</Title>
      <Stack width="100%" marginTop="10px">
        <CopyInput value={props.url} />
      </Stack>

      <ButtonsWrapper>
        <SocialShare />
        <div>
          <Button
            leftIcon={<FontAwesomeIcon icon={faCircleDown} />}
            style={{ marginRight: '12px' }}
          >
            Download
          </Button>
          <Button leftIcon={<FontAwesomeIcon icon={faTrash} />} color="#F75B47">
            Delete
          </Button>
        </div>
      </ButtonsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
`;

const Title = styled.p`
  font-weight: bold;
  padding-bottom: 14px;
  padding-top: 4px;
  line-height: 1;
`;

const ButtonsWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`;
