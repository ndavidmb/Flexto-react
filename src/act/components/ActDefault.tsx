import React, { FC, useEffect, useState } from 'react'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { BookingVm } from '../../booking/interfaces/booking.interface'
import { ActTemplatesList } from './ActTemplatesList'

type Props = {
  acts: ActTemplate[]
}
export const ActDefault: FC<Props> = ({ acts = [] }) => {
  const [bookings, setBookings] = useState<BookingVm[]>([])
  const [allBookings, setAllBookings] = useState<
    BookingVm[]
  >([])

  const handleOpenModal = (data?: ActTemplate) => {
    // setData(data)
    // openModal()
  }

  const handleDelete = async (id: string) => {
    // await actController.deleteTemplate(id)
    // getTemplates()
  }
  // }

  return (

    <DefaultContainerWithSearch
    title="Actas"
    searchOptions={{
      allItems: allBookings,
      searchKeys: ['date', 'publicSpaceName'],
      setItems: setBookings,
    }}
  >
    <ActTemplatesList
      templates={acts}
      labelsName={''}
      editTemplate={(data) => handleOpenModal(data)}
      deleteTemplate={(id) => handleDelete(id)}
    />
  </DefaultContainerWithSearch>
  )
}
