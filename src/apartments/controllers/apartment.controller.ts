import { useDispatch } from 'react-redux'
import { Owner } from '../../owners/interfaces/owner.interface'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { Apartment } from '../interfaces/apartment.interface'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { ApartmentWithOwner } from '../components/AparmentWithOwner'

export function useApartmentController() {
  const dispatch = useDispatch()
  const firestoreApartments = useFirestore<Apartment>(
    FirestoreTable.APARTMENTS,
  )

  const firestoreOwners = useFirestore<Owner>(
    FirestoreTable.OWNER,
  )

  const addApartment = async (apartment: Apartment) => {
    const docRef = await firestoreApartments.addFirestore(
      apartment,
    )
    return docRef
  }

  const deleteApartment = async (
    apartment: ApartmentWithOwner,
  ) => {
    dispatch(setLoading(true))
    try {
      await firestoreApartments.deleteFirestore(
        apartment.id as string,
      )

      if (apartment.hasOwner) {
        await firestoreOwners.deleteFirestore(
          apartment.ownerId as string,
        )
      }

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
    return await firestoreApartments.updateFirestore(
      id,
      apartment,
    )
  }

  const getApartments = async (): Promise<
    ApartmentWithOwner[]
  > => {
    dispatch(setLoading(true))
    try {
      const apartments =
        await firestoreApartments.getAllFirestore()

      const owners = await firestoreOwners.getAllFirestore()

      const apartmentsWithOwners = apartments.map(
        (apartment) => {
          const owner = owners.find(
            (owner) => owner.apartment.id === apartment.id,
          )

          if (owner) {
            return {
              ...apartment,
              ...owner,
              ownerId: owner.id,
              hasOwner: true,
            }
          }

          return {
            ...apartment,
            phone: '',
            email: '',
            name: '',
            hasOwner: false,
          }
        },
      )

      // Esta parte solo aplica para apartamentos
      apartmentsWithOwners.sort((a, b) =>
        a.tower.localeCompare(b.tower),
      )

      return apartmentsWithOwners
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

  return {
    addApartment,
    deleteApartment,
    updateApartment,
    getApartments,
  }
}
