import { useDispatch } from 'react-redux'
import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { useActModelController } from './act.model.controller'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { PaymentSelectedIds } from '../../payments/interfaces/payment-form'

export function useActViewController() {
  const dispatch = useDispatch()
  const actModelController = useActModelController()

  const getAvailableAct = async (date: string) => {
    dispatch(setLoading(true))
    try {
      return await actModelController.getAvailableActs(date)
    } catch (err) {
      dispatch(
        showToast({
          type: 'error',
          title: 'Error al obtener las actas disponibles',
          details: [SUPPORT_MESSAGES.TRY_LATER],
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getActsByOwner = async () => {
    dispatch(setLoading(true))
    try {
      const acts = await actModelController.getActsByIds()
      if (acts.length === 0) {
        dispatch(
          showToast({
            title:
              'El usuario no tiene actas ni documentos para visualizar',
            details: [],
            type: 'info',
          }),
        )
      }
      return acts
    } catch (err) {
      dispatch(
        showToast({
          title: 'No se pudieron obtener las actas',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deleteUserPermissionAct = async (
    act: ActTemplate,
  ) => {
    dispatch(setLoading(true))
    try {
      await actModelController.deleteUserPermissionAct(act)
      dispatch(
        showToast({
          title: 'Se elimino correctamente el acta',
          details: [
            'Para poder visualizarla nuevamente tiene que solicitar el permiso en la sección de permisos',
          ],
          type: 'success',
        }),
      )
    } catch (error) {
      console.error(error)
      dispatch(
        showToast({
          title: 'No se pudo remover el permiso',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }

  const addBulkOwnerActsPermission = async (
    act: ActTemplate,
    selected: PaymentSelectedIds[],
  ) => {
    dispatch(setLoading(true))
    try {
      await actModelController.addBulkOwnerActsPermission(
        act,
        selected,
      )

      dispatch(
        showToast({
          title:
            'Se han compartido correctamente las actas',
          details: [],
          type: 'success',
        }),
      )

      return true
    } catch (error) {
      console.error(error)
      dispatch(
        showToast({
          title: 'No se han podido agregar los permisos',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getActsWithOwner = async () => {
    dispatch(setLoading(true))
    try {
      return await actModelController.getActsWithOwner()
    } catch (error) {
      console.error(error)
      dispatch(
        showToast({
          title: 'No se pudieron obtener las actas',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    getAvailableAct,
    getActsByOwner,
    deleteUserPermissionAct,
    addBulkOwnerActsPermission,
    getActsWithOwner,
  }
}
