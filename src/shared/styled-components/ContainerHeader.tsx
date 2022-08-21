import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title: string
}

export const ContainerHeader: FC<Props> = ({
  children,
  title,
}) => {
  return (
    <div className={`flex gap-2 items-center h-20 px-8`}>
      <h1 className="text-3xl font-bold w-52 text-black">
        {title}
      </h1>

      {children}
    </div>
  )
}
