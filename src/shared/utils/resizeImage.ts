import imageCompression from "browser-image-compression";

export function resizeImage(file: File) {
  const options = {
    maxSizeMB: 3,
    maxWidthOrHeight: 350,
    useWebWorker: true,
  }
  return imageCompression(file, options);
}
