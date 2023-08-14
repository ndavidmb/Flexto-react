import { OwnerDTO } from '../../owners/interfaces/owner.interface'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { useAppSelector } from '../../shared/store/hooks'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { useActRepository } from '../repositories/act.repository'

export const useActModelController = () => {
  const actRepository = useActRepository()
  const ownerRepository = useOwnerRepository()

  const userState = useAppSelector(
    (state) => state.authState,
  )

  const getAvailableActs = async (date: string) => {
    return await actRepository.getActsByDate(date)
  }

  const getActsByIds = async () => {
    let owner: OwnerDTO | null = null
    try {
      owner = await ownerRepository.getOwnerByUid(
        userState.uid,
      )

      if (
        !owner.actsAccess ||
        owner.actsAccess.length === 0
      ) {
        return []
      }

      const allActs = await actRepository.getActsByOwner(
        owner.actsAccess,
      )
      return allActs
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const deleteUserPermissionAct = async (
    act: ActTemplate,
  ) => {
    const owner = await ownerRepository.getOwnerByUid(
      userState.uid,
    )

    ownerRepository.updateActOwner(owner.id!, {
      ...owner,
      actsAccess: owner.actsAccess?.filter(
        (actId) => actId !== act.id,
      ),
    })
  }

  return {
    getAvailableActs,
    getActsByIds,
    deleteUserPermissionAct,
  }
}
