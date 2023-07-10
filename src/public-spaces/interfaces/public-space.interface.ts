export const enum Days {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7,
}

export interface PublicSpaceSchedule {
  days: Days[]
  maxPerHour: number
  rangeEndHour: number
  rangeStartHour: number
}

export interface PublicSpace {
  name: string
  schedule: PublicSpaceSchedule
  id?: string
}

export interface PlainPublicSpace {
  name: string
  maxPerHour: number
  rangeStartHour: number
  rangeEndHour: number
}
