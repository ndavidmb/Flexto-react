import { useFormikContext } from 'formik'
import { FC, useEffect, useState } from 'react'
import { Label } from '../../shared/styled-components/Label'
import { Select } from '../../shared/styled-components/Select'
import { RequestPublicSpaceForm } from '../interfaces/request-public-space.interface'
import { PublicSpace } from '../../public-spaces/interfaces/public-space.interface'
import { getPublicSpaceHours } from '../utils/getPublicSpaceHours'

type Props = {
  publicSpaces: PublicSpace[]
  // endHours: Record<string, number>
}

export const ClientRequestHours: FC<Props> = ({
  publicSpaces,
}) => {
  const [hours, setHours] = useState<{
    startHours: [string, number][]
    endHours: [string, number][]
  }>({
    startHours: [],
    endHours: [],
  })

  const formikContext =
    useFormikContext<RequestPublicSpaceForm>()

  useEffect(() => {
    if (!formikContext.values.publicSpaceId) {
      return
    }

    const space = publicSpaces.find(
      (space) =>
        space.id === formikContext.values.publicSpaceId,
    )
    const availableHours = getPublicSpaceHours(
      space!.schedule.rangeStartHour,
      space!.schedule.rangeEndHour,
    )

    formikContext.setFieldValue(
      'startHour',
      availableHours.startHours[0][1],
    )

    formikContext.setFieldValue(
      'endHour',
      availableHours.endHours[0][1],
    )

    setHours(availableHours)
  }, [formikContext.values.publicSpaceId])

  return (
    <div className="flex gap-1 w-full">
      <div className="w-1/2">
        <Label htmlFor="startHour">Hora de inicio</Label>
        <Select
          className="w-full"
          formik={true}
          allowUndefined={false}
          name="startHour"
          placeholder="Hora"
        >
          {hours.startHours.map(([label, value]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      <div className="w-1/2">
        <Label htmlFor="endHour">
          Hora de finalización
        </Label>
        <Select
          className="w-full"
          formik={true}
          allowUndefined={false}
          name="endHour"
          placeholder="Hora"
        >
          {hours.endHours.map(([label, value]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
