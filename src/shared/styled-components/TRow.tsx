import { Children, cloneElement, FC } from 'react'

type Props = {
  index: number
  children: JSX.Element[]
}

const diffRowColor = (index: number) => {
  return index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
}

export const TRow: FC<Props> = ({ children, index }) => {
  return (
    <tr className={`${diffRowColor(index)} border-b`}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          className: `py-4 px-6 ${
            child.props.className ?? ''
          }`,
        }),
      )}
    </tr>
  )
}
