import { IUserRequest } from "../../auth/interfaces/user.interface"
import { RequestType } from "./client-request.interface"

export interface AccessRequest {
  type: RequestType
  description: string
  customization: string
  approved: boolean
  user: IUserRequest
  dateDetail: {
    date: string
    endHour: string
    startHour: string
  }
}
