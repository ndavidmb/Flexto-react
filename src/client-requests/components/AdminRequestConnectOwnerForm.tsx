import { useEffect, useState } from 'react'
import { useApartmentController } from '../../apartments/controllers/apartment.controller'
import { Select } from '../../shared/styled-components/Select'
import { Apartment } from '../../apartments/interfaces/apartment.interface'

export const AdminRequestConnectOwnerForm = () => {
  const [availableApartments, setAvailableApartments] =
    useState<Apartment[]>([])

  const apartmentController = useApartmentController()

  useEffect(() => {
    apartmentController
      .getAvailableApartments()
      .then((apartments) => {
        setAvailableApartments(apartments)
      })
  }, [])

  return (
    <div>
      <Select>
        {availableApartments.map((apartment) => (
          <option value={apartment.id} key={apartment.id}>
            {apartment.tower} - &nbsp;
            {apartment.apartmentNumber}
          </option>
        ))}
      </Select>
    </div>
  )
}
