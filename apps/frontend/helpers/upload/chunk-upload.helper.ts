export async function uploadChunk(chunk, event) {
  const formData = new FormData();
  formData.append('chunk', event.chunk, 'chunk');

  const response = await fetch(
    `/api/upload/${event.recordingId}/chunk/${event.chunkIndex}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  /** Upload chunk and update local data */

  // .then(function (n) {
  //                 t.inProgress--,
  //                   (t.totalUploadedBytes += e.chunk.size),
  //                   t.onProgress && t.onProgress(t.totalUploadedBytes),
  //                   t.completed && 0 == t.inProgress
  //                     ? t.onUploadsFinished && t.onUploadsFinished()
  //                     : t.startUploads();
  //               })
  //               .catch(function (e) {});
}
