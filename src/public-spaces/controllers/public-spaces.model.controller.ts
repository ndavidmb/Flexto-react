import { useBookingRepository } from '../../booking/repositories/booking.repository'
import { getPublicSpaceHours } from '../../client-requests/utils/getPublicSpaceHours'
import { PublicSpace } from '../interfaces/public-space.interface'
import { usePublicSpacesRepository } from '../repositories/public-spaces.repository'

export const usePublicSpacesModelController = () => {
  const publicSpacesRepository = usePublicSpacesRepository()
  const bookingRepository = useBookingRepository()

  const getAllPublicSpaces = async () => {
    return await publicSpacesRepository.getAll()
  }

  const getPublicSpacesHours = async () => {
    const [publicSpaces, bookings] = await Promise.all([
      publicSpacesRepository.getAll(),
      bookingRepository.getAllBookings(),
    ])

    const publicWithHours = publicSpaces.map((space) => {
      const availableHours = getPublicSpaceHours(
        Number(space.schedule.rangeStartHour),
        Number(space.schedule.rangeEndHour),
      )

      return {
        ...space,
        availableHours,
      }
    })

    return {
      publicWithHours,
      bookings,
    }
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

  const getPublicSpaceById = async (id: string) => {
    const space =
      await publicSpacesRepository.getPublicSpaceById(id)
    return space
  }

  return {
    getAllPublicSpaces,
    getPublicSpacesHours,
    createPublicSpace,
    updatePublicSpace,
    deletePublicSpace,
    getPublicSpaceById,
  }
}
