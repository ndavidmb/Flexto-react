import { DynamicObject } from '../../shared/interfaces/dynamic-object.interface'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import {
  PlainPublicSpace,
  PublicSpace,
} from '../interfaces/public-space.interface'
import { usePublicSpacesModelController } from './public-spaces.model.controller'

export const usePublicSpacesViewController = () => {
  const publicSpacesModelController =
    usePublicSpacesModelController()
  const dispatch = useAppDispatch()

  const getAllPublicSpaces = async () => {
    dispatch(setLoading(true))
    try {
      return await publicSpacesModelController.getAllPublicSpaces()
    } catch (error) {
      dispatch(
        showToast({
          title:
            'No se pudieron traer los espacios públicos',
          details: [
            'Hubo un error del sistema contacte con soporte o intente más tarde',
          ],
          type: 'error',
        }),
      )

      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const createPublicSpace = async (
    space: PlainPublicSpace,
    days: DynamicObject,
  ) => {
    dispatch(setLoading(true))
    try {
      const publicSpace: PublicSpace = {
        name: space.name,
        schedule: {
          days: Object.values(days),
          maxPerHour: space.maxPerHour,
          rangeEndHour: space.rangeEndHour,
          rangeStartHour: space.rangeStartHour,
        },
      }

      await publicSpacesModelController.createPublicSpace(
        publicSpace,
      )

      return true
    } catch (error) {
      dispatch(
        showToast({
          title: 'No se pudo crear el espacio público',
          details: ['No se pudo crear el espacio público'],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updatePublicSpace = async (
    id: string,
    space: PlainPublicSpace,
    days: DynamicObject,
  ) => {
    dispatch(setLoading(true))
    try {
      const publicSpace: PublicSpace = {
        id,
        name: space.name,
        schedule: {
          days: Object.values(days),
          maxPerHour: space.maxPerHour,
          rangeEndHour: space.rangeEndHour,
          rangeStartHour: space.rangeStartHour,
        },
      }

      await publicSpacesModelController.updatePublicSpace(
        publicSpace,
      )
      return true
    } catch (error) {
      dispatch(
        showToast({
          title: 'No se pudo actualizar el espacio público',
          details: [
            'No se pudo actualizar el espacio público',
          ],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deletePublicSpace = async (space: PublicSpace) => {
    dispatch(setLoading(true))
    try {
      await publicSpacesModelController.deletePublicSpace(
        space.id!,
      )
      return true
    } catch (error) {
      dispatch(
        showToast({
          title: 'No se pudo eliminar el registro',
          details: [
            `No se pudo eliminar el espacio público ${space.name}`,
          ],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    getAllPublicSpaces,
    createPublicSpace,
    updatePublicSpace,
    deletePublicSpace,
  }
}
