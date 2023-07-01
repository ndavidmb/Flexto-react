import { useSelector } from 'react-redux'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { RootState } from '../../shared/store/store'
import { getFormattedDate } from '../../shared/utils/formattedDate'
import {
  AdminRequest,
  ClientRequestDTO,
  RequestStates,
} from '../interfaces/request.interface'

export const useRequestRepository = () => {
  const firestore = useFirestore<AdminRequest>(
    FirestoreTable.REQUEST,
  )
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const createRequest = async (
    req: ClientRequestDTO,
  ) => {
    const createdRequest = await firestore.addFirestore({
      type: req.requestType,
      description: req.description,
      customization: theme.id,
      approved: RequestStates.PENDING,
      user: {
        displayName: req.displayName,
        email: req.email,
        uid: req.uid,
        phoneNumber: req.phoneNumber
      },
      dateDetail: {
        date: getFormattedDate(new Date()),

        // Related to rent something
        startHour: req.startHour ?? '',
        endHour: req.endHour ?? '',
      },
    })
    return createdRequest
  }

  const getAdminRequest = async () => {
    const adminRequest = await firestore.getAllFirestore()
    return adminRequest
  }

  const changeRequestState = async (
    newState: RequestStates,
    request: AdminRequest,
  ) => {
    await firestore.updateFirestore(request.id as string, {
      ...request,
      approved: newState,
    })
  }

  const deleteRequest = async (id: string) => {
    await firestore.deleteFirestore(id)
  }

  return {
    createRequest,
    getAdminRequest,
    changeRequestState,
    deleteRequest,
  }
}
