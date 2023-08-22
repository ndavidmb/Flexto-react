import {
  OwnerDTO,
  OwnerWithId,
} from '../../owners/interfaces/owner.interface'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { PaymentSelectedIds } from '../../payments/interfaces/payment-form'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestoreBulk } from '../../shared/hooks/useFirestoreBulk'
import { useAppSelector } from '../../shared/store/hooks'
import {
  ActTemplate,
  ActWithOwnersAccess,
} from '../interfaces/act-templates.interface'
import { useActRepository } from '../repositories/act.repository'

export const useActModelController = () => {
  const actRepository = useActRepository()
  const ownerRepository = useOwnerRepository()
  const firestoreBulk = useFirestoreBulk(
    FirestoreTable.REGISTERED_USER,
  )

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

  const addBulkOwnerActsPermission = async (
    act: ActTemplate,
    selectedIds: PaymentSelectedIds[],
  ) => {
    const batch = firestoreBulk.getBatch()
    const owners =
      (await ownerRepository.getActiveOwners()) as OwnerWithId[]

    const updatedOwners = selectedIds
      .map((selectedId): OwnerWithId | null => {
        const owner = owners.find(
          (owner) => owner.id === selectedId.ownerId,
        )

        if (!owner) {
          return null
        }

        if (!owner.actsAccess) {
          return {
            ...owner,
            actsAccess: [],
          }
        }

        return {
          ...owner,
          actsAccess: selectedId.selected
            ? // Crea un set para evitar elementos repetidos
              (Array.from(
                new Set([...owner.actsAccess, act.id]),
              ) as string[])
            : // Elimina el elemento si no esta seleccionado
              owner.actsAccess.filter(
                (actId) => actId !== act.id,
              ),
        }
      })
      .filter((owner) => Boolean(owner)) as OwnerWithId[]

    firestoreBulk.bulkUpdate(batch, updatedOwners, 'id')
    await firestoreBulk.commitBatch(batch)
  }

  const getActsWithOwner = async (): Promise<
    ActWithOwnersAccess[]
  > => {
    const [owners, acts] = await Promise.all([
      ownerRepository.getActiveOwners() as Promise<
        OwnerWithId[]
      >,
      actRepository.getActs(),
    ])

    return acts.map((act) => {
      const ownerAccess = owners
        .filter((owner) =>
          owner.actsAccess?.includes(act.id!),
        )
        .map((owner) => owner.id)

      return { ...act, ownerAccess }
    })
  }

  return {
    getAvailableActs,
    getActsByIds,
    deleteUserPermissionAct,
    addBulkOwnerActsPermission,
    getActsWithOwner,
  }
}
