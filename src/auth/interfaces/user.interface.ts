import { UserRoles } from "./user-roles.enums"

export interface IUserBase {
  email: string
  role: UserRoles
}

export interface IUserWithDisplayName extends IUserBase {
  displayName: string
}

export interface IUser extends IUserWithDisplayName {
  uid: string
  photoUrl: string
}

export interface IUserWithPassword extends IUserBase {
  password: string
}

export interface IExtraUser {
  role: UserRoles
  uid: string
  customization?: string
}
