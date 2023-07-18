import { addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'
import { EmailData } from '../interfaces/email-data.interface'

export function useEmail() {
  const sendEmail = async ({
    email,
    body,
    subject,
    html = false,
  }: EmailData) => {
    const collectionRef = collection(db, 'mail')

    const emailContent = html
      ? {
          to: email,
          message: {
            subject,
            body,
          },
        }
      : {
          to: email,
          message: {
            subject,
            html: body,
          },
        }

    await addDoc(collectionRef, emailContent)
  }

  return { sendEmail }
}
