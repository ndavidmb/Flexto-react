import { OwnerUpdated } from '../../profiles/interfaces/profile.interface'
import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import {
  Owner,
  OwnerDTO,
} from '../interfaces/owner.interface'
import { useOwnerModelController } from './owner.model.controller'

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

  const getOwnerDetail = async (ownerId: string) => {
    dispatch(setLoading(true))
    try {
      return await ownerModelController.getOwnerDetailBooking(
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

  const getOwnerProfileDetail = async (uid: string) => {
    dispatch(setLoading(true))
    try {
      return await ownerModelController.getOwnerDetailUid(
        uid,
      )
    } catch {
      dispatch(
        showToast({
          title:
            'No se pudo obtener el detalle del cliente',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return null
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updateOwnerProfile = async (
    updatedData: OwnerUpdated,
    oldOwner: OwnerDTO,
  ) => {
    dispatch(setLoading(true))
    try {
      await ownerModelController.updateOwner(
        updatedData,
        oldOwner,
      )

      dispatch(
        showToast({
          title:
            'Se ha actualizado el perfil correctamente',
          details: [],
          type: 'success',
        }),
      )

      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo actualizar el perfil',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const createOwner = async (owner: Owner) => {
    dispatch(setLoading(true))

    try {
      await ownerModelController.createOwner(owner)
      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo crear el propietario',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updateOwner = async (owner: Owner) => {
    dispatch(setLoading(true))
    try {
      const bdOwner =
        await ownerModelController.getOwnerById(owner.id!)

      await ownerModelController.updateOwner(
        {
          displayName: owner.name,
          phoneNumber: owner.phone,
        },
        bdOwner,
      )
      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo actualizar el usuario',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deleteUserTemporally = async (owner: Owner) => {
    try {
      await ownerModelController.deleteTemporallyUser(
        owner.id!,
      )

      dispatch(
        showToast({
          title: 'Se borró el usuario correctamente',
          details: [
            `"${owner.name}" fue eliminado correctamente`,
          ],
          type: 'success',
        }),
      )
      return true
    } catch {
      dispatch(
        showToast({
          title:
            'No se pudo eliminar el usuario correctamente',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    }
  }

  return {
    getOwners,
    getOwnerDetail,
    getOwnerProfileDetail,
    updateOwnerProfile,
    createOwner,
    updateOwner,
    deleteUserTemporally,
  }
}
