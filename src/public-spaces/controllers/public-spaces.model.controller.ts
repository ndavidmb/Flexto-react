import { PublicSpace } from '../interfaces/public-space.interface'
import { usePublicSpacesRepository } from '../repositories/public-spaces.repository'

export const usePublicSpacesModelController = () => {
  const publicSpacesRepository = usePublicSpacesRepository()

  const getAllPublicSpaces = async () => {
    return await publicSpacesRepository.getAll()
  }

  const createPublicSpace = async (space: PublicSpace) => {
    return await publicSpacesRepository.create(space)
  }

  const updatePublicSpace = async (space: PublicSpace) => {
    return await publicSpacesRepository.updatePublicSpace(
      space,
    )
  }

  const deletePublicSpace = async (id: string) => {
    return await publicSpacesRepository.deletePublicSpace(
      id,
    )
  }

  return {
    getAllPublicSpaces,
    createPublicSpace,
    updatePublicSpace,
    deletePublicSpace,
  }
}
