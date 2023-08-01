export interface OwnerUpdated {
  displayName: string
  phoneNumber: string
  blob?: Blob
  name?: string
}

export interface ProfileDTO extends OwnerUpdated {
  id: string
}
