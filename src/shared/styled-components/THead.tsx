import { Children, cloneElement, FC } from 'react'

type Props = {
  children: JSX.Element[]
}

export const THead: FC<Props> = ({ children }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
      <tr>
        {Children.map(children, (child) =>
          cloneElement(child, {
            ...child.props,
            className: `py-3 px-6 ${child.props.className}`,
          }),
        )}
      </tr>
    </thead>
  )
}
