import { useDispatch, useSelector } from 'react-redux'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { useFirestoreDocs } from '../../shared/hooks/useFirestoreDocs'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { RootState } from '../../shared/store/store'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { CloudStorageFolders } from '../../shared/constants/cloud-storage-folders.constants'
import { ActFormData } from '../interfaces/act-form-data.interface'
import { getFormattedDate } from '../../shared/utils/formattedDate'

export const useActController = (
  actType:
    | FirestoreTable.ACT_TEMPLATES
    | FirestoreTable.ACT,
) => {
  const fireStore = useFirestore<ActTemplate>(actType)
  const fireStoreDocs = useFirestoreDocs()

  const dispatch = useDispatch()

  const { theme } = useSelector(
    (store: RootState) => store.themeState,
  )

  const getMappedTemplates = async () => {
    dispatch(setLoading(true))
    try {
      const dbTemplates = await fireStore.getAllFirestore()
      return dbTemplates
    } catch (err) {
      console.error(err)
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const addTemplate = async (formData: ActFormData) => {
    dispatch(setLoading(true))

    if (!formData.documentName.includes('.docx')) {
      return
    }

    const url = await fireStoreDocs.uploadFile({
      file: formData.file,
      filename: formData.documentName,
      filepath: CloudStorageFolders.TEMPLATES,
    })

    if (!theme?.id) {
      return
    }

    await fireStore.addFirestore({
      customization: theme.id,
      documentName: formData.documentName,
      templateName: formData.templateName,
      documentUrl: url,
      date: getFormattedDate(new Date()),
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
    const url = await fireStoreDocs.uploadFile({
      file: formData.file,
      filename: formData.documentName,
      filepath: CloudStorageFolders.TEMPLATES,
    })

    await fireStore.updateFirestore(id, {
      ...oldTemplate,
      documentUrl: url,
      documentName: formData.documentName,
      templateName: formData.templateName,
    })

    await fireStoreDocs.deleteFile(
      oldTemplate.documentName,
      CloudStorageFolders.TEMPLATES,
    )

    dispatch(setLoading(false))
  }

  const deleteTemplate = async (templateId: string) => {
    dispatch(setLoading(true))
    await fireStore.deleteFirestore(templateId)
    dispatch(setLoading(false))
  }

  return {
    getMappedTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
  }
}
