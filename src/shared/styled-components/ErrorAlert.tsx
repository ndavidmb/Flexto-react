import { FC, ReactNode } from 'react'
import { IoClose } from 'react-icons/io5'

type Props = {
  closeAlert: (value: string) => void
  children: ReactNode
}

export const ErrorAlert: FC<Props> = ({
  closeAlert,
  children,
}) => {
  return (
    <>
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-between items-center"
        role="alert"
      >
        <span className="block sm:inline">{children}</span>
        <IoClose onClick={() => closeAlert('')} />
      </div>
      <hr />
    </>
  )
}
