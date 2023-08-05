import { useDispatch } from 'react-redux'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { useActModelController } from './act.model.controller'
import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'
import { ActTemplate } from '../interfaces/act-templates.interface'


export function useActViewController() {
  const dispatch = useDispatch()
  const actModelController =
    useActModelController()

  const getAvailableAct = async (date:string) => {
    dispatch(setLoading(true))
    try {
      return await actModelController.getAvailableActs(date)
    } catch (err) {
      dispatch(
        showToast({
          type: 'error',
          title:
            'Error al obtener las actas disponibles',
          details: [
            SUPPORT_MESSAGES.TRY_LATER,
          ],
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
    return await actModelController.getActsByIds()
  } catch {
    dispatch(
      showToast({
        title: 'No se pudieron obtener las reservas',
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
    getActsByOwner
  }
}
