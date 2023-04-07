import { RecordingPage } from '@features/RecordingPage';
import { MediaInfo } from '@lib/recording';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export default function RecordPage(props: { media: MediaInfo }) {
  return <RecordingPage media={props.media} />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ media: MediaInfo }>> {
  // TODO: Validate if recording exists
  // const recordingData = await getRecordingById(
  // context.params.recordingId as string
  // );

  return {
    props: {
      // recording: recordingData,
      media: {
        mediaId: context.params.recordingId as string,
        ownerToken: '123',
        time: new Date().getTime(),
      },
    }, // will be passed to the page component as props
  };
}
