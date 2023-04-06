import { DownloadUrlReponseDto } from '@voice-recorder/shared-types';

export async function getRecordingById(recordingId: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recording/${recordingId}`
  ).then(res => res.json());
}

export async function getRecordingDownloadUrl(
  recordingId: string
): Promise<DownloadUrlReponseDto> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/download-url/${recordingId}`
  ).then(res => res.json());
}
