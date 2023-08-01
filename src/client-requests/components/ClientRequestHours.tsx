import { useFormikContext } from 'formik'
import { FC, useEffect, useState } from 'react'
import { BookingDTO } from '../../booking/interfaces/booking.interface'
import { PublicSpaceWithHours } from '../../public-spaces/interfaces/public-space.interface'
import { Label } from '../../shared/styled-components/Label'
import { Select } from '../../shared/styled-components/Select'
import { RequestPublicSpaceForm } from '../interfaces/request-public-space.interface'

type Props = {
  viewModel: {
    publicWithHours: PublicSpaceWithHours[]
    bookings: BookingDTO[]
  }
}

export const ClientRequestHours: FC<Props> = ({
  viewModel,
}) => {
  const [state, setState] = useState<{
    relevantBookings: BookingDTO[]
    startHours: [string, number][]
    endHours: [string, number][]
    currentPublicSpace: PublicSpaceWithHours | null
  }>({
    relevantBookings: [],
    startHours: [],
    endHours: [],
    currentPublicSpace: null,
  })

  const formikContext =
    useFormikContext<RequestPublicSpaceForm>()

  // Calculate relevant bookings and start hours available for specific date
  useEffect(() => {
    // Return with invalid dependencies
    if (
      !formikContext.values.publicSpaceId ||
      !formikContext.values.date
    ) {
      return
    }

    // Get relevant bookings
    const { publicSpaceId, date } = formikContext.values

    const relevantBookings = viewModel.bookings.filter(
      (booking) =>
        booking.publicSpace.id === publicSpaceId &&
        booking.date === date,
    )

    // Get start hours
    const currentPublicSpace =
      viewModel.publicWithHours.find(
        (space) =>
          space.id === formikContext.values.publicSpaceId,
      )!

    const startHours =
      currentPublicSpace.availableHours.startHours.filter(
        ([_, hour]) =>
          !relevantBookings.some(
            (booking) =>
              hour >= booking.startHour &&
              hour < booking.endHour,
          ),
      )

    formikContext.setFieldValue(
      'startHour',
      startHours[0][1],
    )
    setState({
      ...state,
      relevantBookings,
      startHours,
      currentPublicSpace,
    })
  }, [
    formikContext.values.publicSpaceId,
    formikContext.values.date,
  ])

  // Calculate end hours according to startHour
  useEffect(() => {
    if (
      !formikContext.values.startHour ||
      !state.currentPublicSpace
    ) {
      return
    }

    const endHours =
      state.currentPublicSpace.availableHours.endHours

    formikContext.setFieldValue('endHour', endHours[0][1])

    setState({
      ...state,
      endHours,
    })
  }, [formikContext.values.startHour])

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
          {state.startHours.map(([label, value]) => (
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
          {state.endHours.map(([label, value]) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
