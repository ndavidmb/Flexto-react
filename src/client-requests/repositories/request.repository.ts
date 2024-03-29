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
import {
  orderBy,
  query,
  where,
} from 'firebase/firestore/lite'
import { IUserRequest } from '../../auth/interfaces/user.interface'

export const useRequestRepository = () => {
  const firestore = useFirestore<AdminRequest>(
    FirestoreTable.REQUEST,
  )
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const createRequest = async (req: ClientRequestDTO) => {
    const createdRequest = await firestore.addFirestore({
      type: req.requestType,
      description: req.description,
      customization: theme.id,
      approved: RequestStates.PENDING,
      user: {
        displayName: req.displayName,
        email: req.email,
        uid: req.uid,
        phoneNumber: req.phoneNumber,
      },
      dateDetail: {
        date: req.date,

        // Related to rent something
        startHour: req.startHour ?? 0,
        endHour: req.endHour ?? 0,
      },
      foreignId: req.foreignId,
      createdAt: new Date().toUTCString(),
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
      customization: request.customization,
      dateDetail: request.dateDetail,
      description: request.description,
      type: request.type,
      user: request.user,
      id: request.id,
      // Updated
      approved: newState,
    })
  }

  const deleteRequest = async (id: string) => {
    await firestore.deleteFirestore(id)
  }

  const getOwnerRequests = async (uid: string) => {
    return await firestore.getAllFirestore([
      where('user.uid', '==', uid),
    ])
  }

  const updateOwner = async (
    request: AdminRequest,
    owner: IUserRequest,
  ) => {
    return await firestore.updateFirestore(request.id!, {
      ...request,
      user: {
        ...request.user,
        ...owner,
      },
    })
  }

  return {
    createRequest,
    getAdminRequest,
    changeRequestState,
    deleteRequest,
    getOwnerRequests,
    updateOwner,
  }
}
