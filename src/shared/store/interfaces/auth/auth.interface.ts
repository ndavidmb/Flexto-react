import { IUser } from '../../../../auth/interfaces/user.interface'

export const enum USER_APPROVED_STATES {
  APPROVED = 2, // Show home app
  PENDING = 1, // Show wait-screen
  NO_LOGGED = 0, // Show login
}

export interface IUserState extends IUser {
  agreement?: string
  userState: USER_APPROVED_STATES
}

export interface IUserPayload {
  payload: IUserState
}
