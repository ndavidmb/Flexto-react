import { Owner } from '../../owners/interfaces/owner.interface'

export interface State {
  affair: string
  detail: string
  owner: Owner
  state: string[]
}
