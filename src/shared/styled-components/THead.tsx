import {
  Children,
  cloneElement,
  FC,
  ReactNode,
  useEffect,
} from 'react'

type Props = {
  children: JSX.Element[]
}

export const THead: FC<Props> = ({ children }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
      <tr>
        {Children.map(children, (child) =>
          cloneElement(child, { className: 'py-3 px-6' }),
        )}
      </tr>
    </thead>
  )
}
