import { Subject } from 'rxjs'

const isRegisterSubject = new Subject<void>()

export const isRegistering$ = isRegisterSubject.asObservable()

export function setLoginEnds() {
  isRegisterSubject.next()
}

