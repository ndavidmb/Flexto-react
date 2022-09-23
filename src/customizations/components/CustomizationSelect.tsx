import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../shared/store/hooks'
import { setTheme } from '../../shared/store/slices/theme/themeSlice'
import { RootState } from '../../shared/store/store'

const OPTIONS_THEME = [
  '#42032C',
  '#D36B00',
  '#E6D2AA',
  '#820000',
  '#B9005B',
  '#FF7C7C',
  '#1F2937',
  '#101827',
  '#2563EB',
  '#355764',
  '#5A8F7B',
  '#81CACF',
  '#2C3333',
  '#E7F6F2',
  '#FFF9CA',
  '#FFDEB4',
]

type Props = {
  title: string
  defaultColor: string
  id: string
  gray?: boolean
}

export const CustomizationSelect: FC<Props> = ({
  title,
  id,
  defaultColor,
  gray = false,
}) => {
  const [color, setColor] = useState(defaultColor)
  const dispatch = useAppDispatch()
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const changeThemeProp = (newColor: string) => {
    dispatch(setTheme({ ...theme, [id]: [newColor.toUpperCase(), title] }))
    setColor(newColor)
  }

  return (
    <div
      className={`flex items-center border-b-gray-200 border-b justify-evenly p-2 ${
        gray ? 'bg-gray-100' : ''
      }`}
    >
      <div className="flex gap-3 items-center">
        <h2 className="text-lg font-bold text-gray-800 w-36 text-end">
          {title}
        </h2>

        <div className="flex h-9 items-center border rounded">
          <input
            className="w-8 h-full p-1 bg-gray-200"
            type="color"
            value={color}
            id={id}
            onChange={(e) => {
              changeThemeProp(e.target.value)
            }}
          />
          <label
            htmlFor={id}
            className="pl-2 pr-5 selection:content-none"
          >
            {color.toUpperCase()}
          </label>
        </div>
      </div>
      <div className="flex gap-2">
        {OPTIONS_THEME.map((color) => (
          <div
            className="border cursor-pointer w-4 h-4 border-gray-400 rounded"
            onClick={() => changeThemeProp(color)}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  )
}
