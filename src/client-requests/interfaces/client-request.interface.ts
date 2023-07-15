export const enum RequestType {
  ACT = 1,
  CHANGE_STATE = 2,
  ACCESS = 3,
}

export interface ClientRequest {
  id?: string
  type: RequestType
  description: string
  idPublicArea: string
  dateDetail: {
    date: string
    startHour: number // solo si es public_area
    endHour: number // solo si es public_area
  }
  approved: boolean
}

export interface ClientRequestRecord {
  date: string
  recordDetail: string
}
export const REQUEST_TYPE_DICT = {
  1: 'Acta',
  2: 'Espacio público',
  3: 'Acceso',
}
