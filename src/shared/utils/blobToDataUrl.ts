// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const blobToDataUrl = (blob: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(blob);
});
