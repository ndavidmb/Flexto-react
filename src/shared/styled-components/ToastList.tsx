import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  textColor: string
}

export const ToastList: FC<Props> = ({
  children,
  textColor,
}) => {
  return (
    <ul
      className={`mt-1.5 ml-4 ${textColor} list-disc list-inside`}
    >
      {children}
    </ul>
  )
}
