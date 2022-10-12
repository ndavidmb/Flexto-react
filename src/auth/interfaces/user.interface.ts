export interface IUserBase {
  email: string
  role: 'admin' | 'client'
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
