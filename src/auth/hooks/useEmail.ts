import { addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'

export function useEmail() {
  const sendEmail = async (
    email: string,
    subject: string,
    body: string,
  ) => {
    const collectionRef = collection(db, 'mail')
    const emailContent = {
      to: email,
      message: {
        subject,
        text: body,
        html: '<p></p>',
      },
    }
    await addDoc(collectionRef, emailContent)
  }

  return { sendEmail }
}
