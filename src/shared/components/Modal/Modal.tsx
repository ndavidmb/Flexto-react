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
      <div className="absolute left-0 top-0 z-10 flex justify-center items-center h-screen w-screen background-blur"></div>

      <section className="absolute flex justify-center items-center top-0 left-0 z-20 w-screen h-screen">
        <div className={`bg-white shadow rounded ${width}`}>
          <header className="flex justify-between items-center bg-menu px-5 py-2 rounded-t">
            <h2 className="text-white cursor-default">
              {title}
            </h2>
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
