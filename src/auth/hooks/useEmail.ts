import { addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'
import { EmailData } from '../interfaces/email-data.interface'
import { useFirestoreBulk } from '../../shared/hooks/useFirestoreBulk'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useMemo } from 'react'

const collectionRef = collection(db, 'mail')
export function useEmail() {
  const sendEmail = async ({
    email,
    body,
    subject,
    html = false,
  }: EmailData) => {
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

  const sendBulkEmails = async (
    emails: string[],
    {
      body,
      subject,
      html = false,
    }: Omit<EmailData, 'email'>,
  ) => {
    const emailContent = html
      ? {
          to: emails,
          message: {
            subject,
            body,
          },
        }
      : {
          to: emails,
          message: {
            subject,
            html: body,
          },
        }
    await addDoc(collectionRef, emailContent)
  }

  return { sendEmail, sendBulkEmails }
}
