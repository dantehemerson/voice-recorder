import { RecordingPage } from '@features/RecordingPage';
import { getRecordingById } from '@lib/services/recording.service';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { MediaInfoDto } from '@voice-recorder/shared-types';

export default function RecordPage(props: { media: MediaInfoDto }) {
  return <RecordingPage media={props.media} />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ media: MediaInfoDto }>> {
  try {
    const recordingData = await getRecordingById(
      context.params.recordingId as string
    );

    return {
      props: {
        media: {
          mediaId: recordingData.mediaId,
          ownerToken: recordingData.ownerToken,
          status: 0,
        },
      },
    };
  } catch (error) {
    console.error('Error loading data from server', error);
    return {
      notFound: true,
    };
  }
}
