import { FormikErrors, FormikTouched } from 'formik'
import { FC, useEffect, useState } from 'react'
import { IRegisterForm } from '../interfaces/register-form.interface'

type Props = {
  errors: FormikErrors<IRegisterForm>
  touched: FormikTouched<IRegisterForm>
}

export const ErrorRegisterAlert: FC<Props> = ({
  errors,
  touched,
}) => {
  const [listOfErrors, setListOfErrors] = useState<
    JSX.Element[]
  >([])

  useEffect(() => {
    const list = Object.entries(errors)
      .map(([key, msg]) => {
        const k = key as keyof typeof errors
        if (errors[k] && touched[k]) {
          return <li key={key}>{msg}</li>
        }

        return null
      })
      .filter((f) => f !== null)

    setListOfErrors(list as JSX.Element[])
  }, [errors, touched])

  return listOfErrors.length > 0 ? (
    <div className="absolute bg-yellow-100 w-64 border-yellow-200 shadow right-3 bottom-3 p-5">
      <ul className="ml-5 list-disc">{listOfErrors}</ul>
    </div>
  ) : (
    <></>
  )
}
