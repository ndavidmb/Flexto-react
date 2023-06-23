import { useDispatch, useSelector } from 'react-redux'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { useFirestoreDocs } from '../../shared/hooks/useFirestoreDocs'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { RootState } from '../../shared/store/store'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { CloudStorageFolders } from '../../shared/constants/cloud-storage-folders.constants'
import { ActFormData } from '../interfaces/act-form-data.interface'

export const useActController = () => {
  const { getAllFirestore, addFirestore, updateFirestore } =
    useFirestore<ActTemplate>(FirestoreTable.ACT_TEMPLATES)

  const { getUrl, uploadFile, deleteFile } =
    useFirestoreDocs()
  const dispatch = useDispatch()

  const { theme } = useSelector(
    (store: RootState) => store.themeState,
  )

  const getMappedTemplates = async () => {
    const dbTemplates = await getAllFirestore()
    return dbTemplates
  }

  const addTemplate = async (formData: ActFormData) => {
    dispatch(setLoading(true))
    const url = await uploadFile(
      formData.file,
      formData.documentName,
      CloudStorageFolders.TEMPLATES,
    )

    if (!theme?.id) {
      return
    }

    await addFirestore({
      customization: theme.id,
      documentName: formData.documentName,
      templateName: formData.templateName,
      documentUrl: url,
    })

    dispatch(setLoading(false))
  }

  const updateTemplate = async (data: {
    id: string
    oldTemplate: ActTemplate
    formData: ActFormData
  }) => {
    dispatch(setLoading(true))

    const { id, oldTemplate, formData } = data
    const url = await uploadFile(
      formData.file,
      formData.documentName,
      CloudStorageFolders.TEMPLATES,
    )

    await updateFirestore(id, {
      ...oldTemplate,
      documentUrl: url,
      documentName: formData.documentName,
      templateName: formData.templateName,
    })

    await deleteFile(
      oldTemplate.documentName,
      CloudStorageFolders.TEMPLATES,
    )

    dispatch(setLoading(false))
  }

  return { getMappedTemplates, addTemplate, updateTemplate }
}
