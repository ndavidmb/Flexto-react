import { useSelector } from 'react-redux'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { RootState } from '../../shared/store/store'
import { RequestType } from '../interfaces/client-request.interface'
import { getFormattedDate } from '../../shared/utils/formattedDate'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { IUserRequest } from '../../auth/interfaces/user.interface'

export const useRequestService = () => {
  const firestore = useFirestore<AdminRequest>(
    FirestoreTable.REQUEST,
  )
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const createAccessRequest = async (
    user: IUserRequest,
  ) => {
    const createdRequest = await firestore.addFirestore({
      type: RequestType.ACCESS,
      description: 'Solicitud de acceso',
      customization: theme.id,
      approved: RequestStates.PENDING,
      user,
      dateDetail: {
        date: getFormattedDate(new Date()),
        startHour: '',
        endHour: '',
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
    createAccessRequest,
    getAdminRequest,
    changeRequestState,
    deleteRequest,
  }
}
