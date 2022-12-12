import { Button, Card, Stack } from '@components/atoms';
import { CopyInput, SocialShare } from '@components/molecules';
import {
  faCircleDown,
  faCloudArrowUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

type UploadResultProps = {
  url: string;
};

export function UploadResult(props: UploadResultProps) {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <Wrapper>
      {!isUploaded ? (
        <div>
          <Stack marginTop="0px" width="100%" justifyContent="center">
            <Button
              onClick={() => setIsUploaded(true)}
              leftIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
            >
              Save and share
            </Button>
          </Stack>
        </div>
      ) : (
        <div>
          <Title>Share Recording:</Title>
          <Stack width="100%" marginTop="10px">
            <CopyInput value={props.url} />
          </Stack>

          <ButtonsWrapper>
            <SocialShare url={props.url} />
            <div>
              <Button
                leftIcon={<FontAwesomeIcon icon={faCircleDown} />}
                style={{ marginRight: '8px' }}
              >
                Download
              </Button>
              <Button
                leftIcon={<FontAwesomeIcon icon={faTrash} />}
                color="#F75B47"
              >
                Delete
              </Button>
            </div>
          </ButtonsWrapper>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Card)`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  padding: 1rem 1rem;
  justify-content: center;
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
