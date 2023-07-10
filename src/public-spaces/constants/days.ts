import { Days } from '../interfaces/public-space.interface'

export const DAYS = {
  Lunes: Days.MONDAY,
  Martes: Days.TUESDAY,
  Miércoles: Days.WEDNESDAY,
  Jueves: Days.THURSDAY,
  Viernes: Days.FRIDAY,
  Sábado: Days.SATURDAY,
  Domingo: Days.SUNDAY,
}

export const DAYS_DICT = {
  [Days.MONDAY]: 'Lunes',
  [Days.TUESDAY]: 'Martes',
  [Days.WEDNESDAY]: 'Miércoles',
  [Days.THURSDAY]: 'Jueves',
  [Days.FRIDAY]: 'Viernes',
  [Days.SATURDAY]: 'Sábado',
  [Days.SUNDAY]: 'Domingo',
}
