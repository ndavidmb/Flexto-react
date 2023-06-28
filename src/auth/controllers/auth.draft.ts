/* const createdRequest = await firestore.addFirestore({
  type: RequestType.ACCESS,
  description: 'Solicitud de acceso',
  customization: agreement || '',
  approved: false,
  dateDetail: {
    date: getFormattedDate(new Date()),
    startHour: '',
    endHour: '',
  },
})

await email.sendEmail(
  'meconios@outlook.com',
  'Solicitud de acceso',
  '<div> Mensaje ',
)


function getFormattedDate(date: Date) {
const year = date.getFullYear()
const month = (1 + date.getMonth())
.toString()
.padStart(2, '0')
const day = date.getDate().toString().padStart(2, '0')

return month + '/' + day + '/' + year
}


export interface AccessRequest {
type: RequestType
description: string
customization: string
approved: boolean
dateDetail: {
date: string
endHour: string
startHour: string
}
}


const firestore = useFirestore<AccessRequest>(
FirestoreTable.REQUEST,
)
const email = useEmail()
*/
