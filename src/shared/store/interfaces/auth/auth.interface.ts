import {
  IUser,
  RoleType,
} from '../../../../auth/interfaces/user.interface'

export interface IState extends IUser {
  agreement: string
}

export interface IUserPayload {
  payload: IState
}

export interface IUserExtraPayload {
  payload: {
    role: RoleType
  }
}