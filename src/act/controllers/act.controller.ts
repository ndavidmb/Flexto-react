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
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { ValidateError } from '../../shared/errors/validate-error'
import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'
import { validateFormat } from '../utils/validate-format'

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

    try {
      const { documentName } = formData
      if (
        !documentName.includes('.docx') &&
        !documentName.includes('.pdf')
      ) {
        throw new ValidateError('incorrect_format')
      }

      const url = await fireStoreDocs.uploadFile({
        file: formData.file,
        filename: formData.documentName,
        filepath: CloudStorageFolders.TEMPLATES,
      })

      await fireStore.addFirestore({
        customization: theme.id,
        documentName: formData.documentName,
        templateName: formData.templateName,
        documentUrl: url,
        date: getFormattedDate(new Date()),
        permissionsOwnersAct:[]
      })
      return true
    } catch (error) {
      dispatch(showToast(validateFormat(error)))
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updateTemplate = async (data: {
    id: string
    oldTemplate: ActTemplate
    formData: ActFormData
  }) => {
    dispatch(setLoading(true))
    try {
      const { id, oldTemplate, formData } = data
      const { documentName } = formData

      if (
        !documentName.includes('.docx') &&
        !documentName.includes('.pdf')
      ) {
        throw new ValidateError('incorrect_format')
      }

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
      return true
    } catch (error) {
      dispatch(showToast(validateFormat(error)))
      return false
    } finally {
      dispatch(setLoading(false))
    }
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
