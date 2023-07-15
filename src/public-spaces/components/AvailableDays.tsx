import { FC } from 'react'
import { Days } from '../interfaces/public-space.interface'
import { DAYS_DICT } from '../constants/days'


type Props = {
  days: Days[]
}

export const AvailableDays: FC<Props> = ({ days }) => {
  return (
    <ul>
      {days.map((day) => (
        <li key={day}>{DAYS_DICT[day]}</li>
      ))}
    </ul>
  )
}
