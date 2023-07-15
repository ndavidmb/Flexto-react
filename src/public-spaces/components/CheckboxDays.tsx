import { FC } from 'react'
import { DynamicDays } from '../../shared/interfaces/dynamic-object.interface'
import { Checkbox } from '../../shared/styled-components/Checkbox'
import { Label } from '../../shared/styled-components/Label'
import { Days } from '../interfaces/public-space.interface'
import { DAYS } from '../constants/days'

type Props = {
  days: DynamicDays
  setDays: React.Dispatch<
    React.SetStateAction<DynamicDays>
  >
}

export const CheckboxDays: FC<Props> = ({
  days,
  setDays,
}) => {
  const handleChange = (
    checked: boolean,
    day: string,
    value: Days,
  ) => {
    if (checked) {
      setDays({ ...days, [day]: value })
    } else {
      const newDays = { ...days }
      delete newDays[day]
      setDays(newDays)
    }
  }

  return (
    <div className="flex justify-center bg-gray-100 rounded p-2 gap-2">
      {Object.entries(DAYS).map(([day, value]) => (
        <div
          key={day}
          className="flex flex-col items-center"
        >
          <Label htmlFor={day}>{day}</Label>
          <Checkbox
            key={day}
            name={day}
            onChange={(ev) =>
              handleChange(ev.target.checked, day, value)
            }
            value={value}
            checked={Boolean(days[day])}
          />
        </div>
      ))}
    </div>
  )
}
