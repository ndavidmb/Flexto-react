export interface ActTemplate {
  documentUrl: string
  documentName: string
  templateName: string
  date: string
  permissionsOwnersAct: string[]
  id?: string
  customization?: string
}

export interface ActWithOwnersAccess extends ActTemplate {
  ownerAccess: string[]
}