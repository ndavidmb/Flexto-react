import { User } from 'firebase/auth'

export interface RegisterFallback {
  // extraUserId: string | null
  newUserInstance: User | null
}
