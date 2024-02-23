export const addCompressedDataToURL = (compressedData: string): string => {
  const url = new URL(window.location.href);
  url.searchParams.set('workspaceData', compressedData);

  return url.toString();
};

export const compressString = async (inputString: string) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(inputString);
  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(encodedData);
      controller.close();
    },
  });

  const compressedStream = inputStream.pipeThrough(new CompressionStream('gzip'));
  const reader = compressedStream.getReader();
  const chunks = [];

  let result;
  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
  }

  const compressedBlob = new Blob(chunks, { type: 'application/gzip' });
  const arrayBuffer = await compressedBlob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  return btoa(String.fromCharCode(...uint8Array));
};

export const decompressString = async (compressedBase64String: string) => {
  const binaryString = atob(compressedBase64String);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(uint8Array);
      controller.close();
    },
  });

  const decompressedStream = inputStream.pipeThrough(new DecompressionStream('gzip'));
  const reader = decompressedStream.getReader();
  const chunks = [];
  let result;
  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
  }

  const decodedData = new TextDecoder().decode(concatenateUint8Arrays(chunks));
  return decodedData;
};

const concatenateUint8Arrays = (arrays: Uint8Array[]) => {
  let totalLength = 0;
  for (const arr of arrays) {
    totalLength += arr.length;
  }

  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
};
