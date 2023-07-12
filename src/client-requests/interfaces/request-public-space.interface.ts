import { PublicSpace } from '../../public-spaces/interfaces/public-space.interface'

export interface RequestBase {
  date: string
  startHour: number
  endHour: number
}

export interface RequestPublicSpaceDTO extends RequestBase {
  space: PublicSpace
}

export interface RequestPublicSpaceForm extends RequestBase {
  publicSpaceId: string
}
