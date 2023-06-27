import imageCompression from "browser-image-compression";

export function resizeImage(file: File) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 150,
    useWebWorker: true,
  }
  return imageCompression(file, options);
}
