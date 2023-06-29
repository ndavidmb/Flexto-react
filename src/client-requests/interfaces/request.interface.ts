import { IUserRequest } from '../../auth/interfaces/user.interface'
import { RequestType } from './client-request.interface'

export const enum RequestStates {
  PENDING = 'null',
  ACCEPTED = 'true',
  REJECTED = 'false',
}

export const REQUEST_STATES_DICT = {
  null: 'Pendiente',
  false: 'Rechazado',
  true: 'Aceptado',
}

export interface AdminRequest {
  type: RequestType
  description: string
  customization: string
  user: IUserRequest
  approved: RequestStates
  id?: string
  dateDetail: {
    date: string
    endHour: string
    startHour: string
  }
}

export interface AdminRequestVm extends AdminRequest {
  strType: string
  state: string
  email: string
  username: string
}
