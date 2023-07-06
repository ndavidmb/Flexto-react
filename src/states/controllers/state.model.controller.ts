import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { useStateRepository } from '../repositories/state.repository'

export const useStateModelController = () => {
  const stateRepository = useStateRepository()
  const ownerRepository = useOwnerRepository()

  const getAllStates = async () => {
    return await stateRepository.getAllStates()
  }

  const getStateDetail = async (stateId: string) => {
    const owners = await ownerRepository.getOwnersByState(stateId)
  }
}
