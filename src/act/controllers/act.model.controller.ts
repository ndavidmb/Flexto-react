import { documentId, where } from 'firebase/firestore/lite'
import { OwnerDTO } from '../../owners/interfaces/owner.interface'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { useActRepository } from '../repositories/act.repository'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { useAppSelector } from '../../shared/store/hooks'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'

export const useActModelController = () => {
  const actRepository = useActRepository()
  const ownerRepository = useOwnerRepository()

  const userState = useAppSelector(
    (state) => state.authState,
  )

  const dispatch = useDispatch()

  const getAvailableActs = async (date: string) => {
    return await actRepository.getActsByDate(date)
  }

  const getActsByIds = async () => {
    let owner: OwnerDTO | null = null
    try {
      owner = await ownerRepository.getOwnerByUid(
        userState.uid,
      )
      if(owner.actsAccess!==undefined){
        const allActs = await actRepository.getActsByOwner( owner.actsAccess )
        return allActs
      }
      else{
        throw new Error("ID is undefined");
       }
       
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return {
    getAvailableActs,
    getActsByIds,
  }
}
