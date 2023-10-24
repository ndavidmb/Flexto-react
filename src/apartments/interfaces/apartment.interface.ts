export interface MemberInfo {
  name: string
  phone: string
}

export interface Vehicle {
  licensePlate: string
}

export interface Pet {
  type: 'cat' | 'dog' | 'other'
  quantity: number
  description: string
}

export interface ApartmentExtraInfo {
  members: MemberInfo[]
  vehicle: Vehicle
  pets: Pet[]
  // eslint-disable-next-line no-use-before-define
  type: ApartmentType
}
export interface Apartment {
  tower: string
  apartmentNumber: string
  extraInfo: ApartmentExtraInfo
  owner?: string
  id?: string
}

export interface ApartmentWithId extends Apartment {
  id: string
}

export const enum ApartmentType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
}

export interface ApartmentFromForm {
  tower: string
  apartmentNumber: string
  licensePlate: string

  memberName: string
  memberPhone: string

  petType: 'cat' | 'dog' | 'other'
  petDescription: string
  petQuantity: number

  members: MemberInfo[]
  pets: Pet[]
  type: ApartmentType
}

export const PET_TYPE = {
  cat: 'Gato',
  dog: 'Perro',
  other: 'Otro',
}
