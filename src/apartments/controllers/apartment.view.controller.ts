import { useDispatch } from 'react-redux'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { ApartmentWithOwner } from '../components/AparmentWithOwner'
import { Apartment } from '../interfaces/apartment.interface'
import { useApartmentModelController } from './apartment.model.controller'
import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'

export function useApartmentViewController() {
  const dispatch = useDispatch()
  const apartmentModelController =
    useApartmentModelController()

  const addApartment = async (apartment: Apartment) => {
    dispatch(setLoading(true))
    try {
      return await apartmentModelController.addApartment(
        apartment,
      )
    } catch (err) {
      dispatch(
        showToast({
          title: 'No se pudo crear la unidad residencial',
          details: [
            'Intente más tarde o contacte con soporte',
          ],
          type: 'error',
        }),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deleteApartment = async (
    apartment: ApartmentWithOwner,
  ) => {
    dispatch(setLoading(true))
    try {
      await apartmentModelController.deleteApartment(
        apartment,
      )

      return true
    } catch (err) {
      dispatch(
        showToast({
          type: 'error',
          title: 'Error al borrar la unidad residencial',
          details: [
            'No se pudo eliminar la unidad residencial',
          ],
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updateApartment = async (
    id: string,
    apartment: Apartment,
  ) => {
    dispatch(setLoading(true))
    try {
      await apartmentModelController.updateApartment({
        ...apartment,
        id,
      })
      dispatch(
        showToast({
          title:
            'Se ha actualizado el perfil correctamente',
          details: [],
          type: 'success',
        }),
      )

      return true
    } catch (err) {
      dispatch({
        type: 'error',
        title: 'Error al actualizar la unidad residencial',
        details: [
          `No se pudo actualizar la unidad residencial ${apartment.apartmentNumber} del bloque ${apartment.tower}`,
        ],
      })
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getApartments = async (): Promise<
    ApartmentWithOwner[]
  > => {
    dispatch(setLoading(true))
    try {
      return await apartmentModelController.getApartmentsWithOwners()
    } catch (err) {
      dispatch({
        type: 'error',
        title:
          'Error al obtener las unidades residenciales',
        details: [
          'No se pudieron obtener las unidades residenciales',
        ],
      })
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getAvailableApartments = async () => {
    dispatch(setLoading(true))
    try {
      return await apartmentModelController.getAvailableApartments()
    } catch (err) {
      dispatch(
        showToast({
          type: 'error',
          title:
            'Error al obtener las unidades residenciales',
          details: [
            'No se pudieron obtener las unidades residenciales',
          ],
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getApartmentByOwner = async (uid: string) => {
    dispatch(setLoading(true))
    try {
      return await apartmentModelController.getApartmentByOwner(
        uid,
      )
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo obtener el apartamento',
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
    addApartment,
    deleteApartment,
    updateApartment,
    getApartments,
    getAvailableApartments,
    getApartmentByOwner,
  }
}
