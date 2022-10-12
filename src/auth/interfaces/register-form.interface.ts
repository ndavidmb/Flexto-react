import {
  IUserWithDisplayName,
  IUserWithPassword,
} from './user.interface'

export interface IRegisterForm extends IUserWithPassword {
  name: string
  surnames: string
  passwordRepeated: string
}

export interface IRegisterFirebase
  extends IUserWithPassword,
    IUserWithDisplayName {
  photo: {
    blob: Blob
    name: string
  }
}
