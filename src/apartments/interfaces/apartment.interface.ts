export interface MemberInfo {
  name: string
  phone: string
}

export interface Vehicle {
  licensePlate: string
}

export interface Pet {
  type: 'cat' | 'dog' | 'other'
  description: string
}

export interface ApartmentExtraInfo {
  members: MemberInfo[]
  vehicle: Vehicle
  pets: Pet[]
  type: 'house' | 'apartment'
}

export interface Apartment {
  tower: string
  apartmentNumber: string
  owner?: string
  id?: string
  extraInfo?: ApartmentExtraInfo
}
