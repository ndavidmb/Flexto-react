import { useOwnerModelController } from './owner.model.controller'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'

export const useOwnerViewController = () => {
  const ownerModelController = useOwnerModelController()
  const dispatch = useAppDispatch()

  const getOwners = async () => {
    dispatch(setLoading(true))
    try {
      return await ownerModelController.getOwners()
    } catch (err) {
      dispatch(
        showToast({
          title: 'Error al consultar los propietarios',
          details: [
            'No se pudieron consultar los propietarios consulte más tarde o contacte con un administrador',
          ],
          type: 'error',
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getOwnerWithStates = async (id: string) => {
    dispatch(setLoading(true))
    try {
      // TODO: Add functions with states
      // const [] = await Promise.all([ownerModelController])
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getOwnerDetail = async (ownerId: string) => {
    dispatch(setLoading(true))
    try {
      return await ownerModelController.getOwnerDetail(
        ownerId,
      )
    } catch {
      dispatch(
        showToast({
          title:
            'No se pudo obtener el detalle del propietario',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )

      return null
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    getOwners,
    getOwnerWithStates,
    getOwnerDetail,
  }
}
