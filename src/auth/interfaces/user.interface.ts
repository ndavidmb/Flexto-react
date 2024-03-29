import { UserRoles } from './user-roles.enums'

export interface IUserBase {
  email: string
  role: UserRoles
}

export interface IUserWithDisplayName extends IUserBase {
  displayName: string
}

export interface IUserRequest {
  uid: string
  email: string
  displayName: string
  phoneNumber: string
}

export interface IUser extends IUserWithDisplayName {
  uid: string
  photoUrl: string | null
}

export interface IUserWithPassword extends IUserBase {
  password: string
}

export interface IExtraUser {
  role: UserRoles
  uid: string
  accepted: boolean
  phoneNumber: string
  apartmentId: string
  customization?: string
  actsAccess:string[]
  id?: string
}
