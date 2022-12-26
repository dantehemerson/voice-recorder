import { RecordingPage } from '@features/RecordingPage';
import { GetServerSidePropsContext } from 'next';

export default function RecordPage(props) {
  return <RecordingPage recording={props.recording} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const recordingData = await getRecordingById(
  // context.params.recordingId as string
  // );

  return {
    props: {
      // recording: recordingData,
      recording: {
        mediaId: context.params.recordingId,
      },
    }, // will be passed to the page component as props
  };
}
