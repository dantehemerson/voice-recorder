export function getDownloadAudioUrl(audioId: string): string {
  return `${process.env.NEXT_PUBLIC_WEB_URL}/${audioId}`;
}
