export type RoleType = 'admin' | 'client'

export interface IUserBase {
  email: string
  role?: RoleType
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
  agreement?: string
  role: RoleType
  uid: string
}
