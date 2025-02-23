import { DownloadUrlReponseDto } from '@lib/dto/download-url-reponse.dto';
import { MediaInfoDto } from '@lib/dto/media-info.dto';
import { HttpStatus } from '@lib/enums/http-status.enum';

export async function getRecordingById(
  recordingId: string
): Promise<MediaInfoDto> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/${recordingId}`
  );

  if (response.status === HttpStatus.NOT_FOUND) {
    throw new Error('Recording not found.');
  }

  return response.json();
}

export async function deleteRecording(recordingId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/${recordingId}`, {
    method: 'DELETE',
  }).then(res => {
    if (res.status === HttpStatus.NO_CONTENT) {
      return undefined;
    } else {
      return res.json();
    }
  });
}

export async function getRecordingDownloadUrl(
  recordingId: string
): Promise<DownloadUrlReponseDto> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/download-url/${recordingId}`
  ).then(res => res.json());
}
