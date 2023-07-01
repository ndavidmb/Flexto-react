import { useOwnerModelController } from './owner.model.controller'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'

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

  return {
    getOwners,
    getOwnerWithStates,
  }
}
