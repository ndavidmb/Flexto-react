import { User } from 'firebase/auth'
import { RegisterFallback } from '../interfaces/register-fallback.interface'

export class RegisterError extends Error {
  fallbackData: RegisterFallback

  constructor(
    message: string,
    fallbackData: RegisterFallback,
  ) {
    super(message)
    this.name = 'RegisterError'
    this.fallbackData = fallbackData
  }
}
