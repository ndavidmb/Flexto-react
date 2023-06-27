import {
  IUser,
} from '../../../../auth/interfaces/user.interface'

export interface IState extends IUser {
  isLogged: boolean
  agreement?: string
}

export interface IUserPayload {
  payload: IState
}
