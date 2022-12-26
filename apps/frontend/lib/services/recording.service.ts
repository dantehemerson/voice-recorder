export async function getRecordingById(recordingId: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recording/${recordingId}`
  ).then(res => res.json());
}
