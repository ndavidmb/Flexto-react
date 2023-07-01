import { useDispatch } from 'react-redux'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { ApartmentWithOwner } from '../components/AparmentWithOwner'
import { Apartment } from '../interfaces/apartment.interface'
import { useApartmentModelController } from './apartment.model.controller'

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
          title: 'No se pudo crear el apartamento',
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
          title: 'Error al borrar el apartamento',
          details: ['No se pudo eliminar el apartamento'],
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
      return await apartmentModelController.updateApartment(
        {
          ...apartment,
          id,
        },
      )
    } catch (err) {
      dispatch({
        type: 'error',
        title: 'Error al actualizar el apartamento',
        details: [
          `No se pudo actualizar el apartamento ${apartment.apartmentNumber} del bloque ${apartment.tower}`,
        ],
      })
      return []
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
        title: 'Error al obtener los apartamentos',
        details: [
          'No se pudieron obtener los apartamentos',
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
          title: 'Error al obtener los apartamentos',
          details: [
            'No se pudieron obtener los apartamentos',
          ],
        }),
      )
      return []
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
  }
}
