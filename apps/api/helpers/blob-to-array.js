async function blobToArray(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const intArray = new Int8Array(arrayBuffer);
  const file = new File([arrayBuffer], 'filename.ext', {
    type: 'application/octet-stream',
  });
  const url = URL.createObjectURL(file);
  console.log(file, url);
  return [...intArray];
}
