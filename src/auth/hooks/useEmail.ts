import { addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'

export function useEmail() {
  const sendEmail = async (emailData: {
    email: string
    subject: string
    body: string
  }) => {
    const collectionRef = collection(db, 'mail')
    const emailContent = {
      to: emailData.email,
      message: {
        email: emailData.subject,
        text: emailData.body,
        html: '<p>Este es un mensaje de prueba</p>',
      },
    }
    await addDoc(collectionRef, emailContent)
  }

  return { sendEmail }
}
