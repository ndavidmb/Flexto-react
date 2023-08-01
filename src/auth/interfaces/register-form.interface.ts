import {
  IUserWithDisplayName,
  IUserWithPassword,
} from './user.interface'

export interface IRegisterForm extends IUserWithPassword {
  name: string
  surnames: string
  passwordRepeated: string
  phoneNumber: string
  requestDescription: string
}

export interface IRegisterFirebase
  extends IUserWithPassword,
    IUserWithDisplayName {
  phoneNumber: string
  requestDescription: string
  photo: {
    blob: Blob
    name: string
  } | null
}
