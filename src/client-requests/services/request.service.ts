import { useSelector } from 'react-redux'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { RootState } from '../../shared/store/store'
import { RequestType } from '../interfaces/client-request.interface'
import { getFormattedDate } from '../../shared/utils/formattedDate'
import { AccessRequest } from '../interfaces/access-request.interface'
import { IUserRequest } from '../../auth/interfaces/user.interface'

export const useRequestService = () => {
  const firestore = useFirestore<AccessRequest>(
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
      approved: false,
      user,
      dateDetail: {
        date: getFormattedDate(new Date()),
        startHour: '',
        endHour: '',
      },
    })
    return createdRequest
  }

  return { createAccessRequest }
}
