import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { storage } from '../services/firebase.service'
import { CloudStorageFolders } from '../constants/cloud-storage-folders.constants'

export const useFirestoreDocs = () => {
  const getUrl = async ({
    fileName,
    path,
  }: {
    fileName: string
    path: CloudStorageFolders
  }) => {
    const storageRef = ref(storage, `${path}/${fileName}`)
    const url = await getDownloadURL(storageRef)

    return url
  }

  const uploadFile = async (uploadData: {
    file: Blob
    filename: string
    filepath: CloudStorageFolders
  }) => {
    const { file, filename, filepath } = uploadData
    const storageRef = ref(
      storage,
      `${filepath}/${filename}`,
    )
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  }

  const deleteFile = async (
    filename: string,
    filepath: CloudStorageFolders,
  ) => {
    const desertRef = ref(
      storage,
      `${filepath}/${filename}`,
    )
    return await deleteObject(desertRef)
  }

  return {
    deleteFile,
    uploadFile,
    getUrl,
  }
}
