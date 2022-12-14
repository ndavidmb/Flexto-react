import { FC, ReactNode } from 'react'
import { IoClose } from 'react-icons/io5'

type Props = {
  children: ReactNode
  title: string
  close: () => void
  width?: string
}

export const ModalContainer: FC<Props> = ({
  children,
  title,
  width = 'w-96',
  close,
}) => {
  return (
    <>
      <div className="absolute z-10 flex justify-center items-center h-screen w-full background-blur"></div>
      <section className="absolute z-20 flex flex-col justify-center items-center w-full h-screen">
        <div className={`bg-white shadow rounded ${width}`}>
          <header className="flex justify-between items-center bg-menu px-5 py-2 rounded-t">
            <h1 className="text-white cursor-default text-2xl font-semibold">
              {title}
            </h1>
            <IoClose
              onClick={close}
              className="text-white hover:bg-gray-600 rounded-full"
            />
          </header>
          <div className="p-5">{children}</div>
        </div>
      </section>
    </>
  )
}
