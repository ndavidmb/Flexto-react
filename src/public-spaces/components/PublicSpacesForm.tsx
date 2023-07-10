import { Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { DynamicObject } from '../../shared/interfaces/dynamic-object.interface'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { Label } from '../../shared/styled-components/Label'
import { Select } from '../../shared/styled-components/Select'
import { DAYS_DICT } from '../constants/days'
import { HOURS } from '../constants/hours'
import { usePublicSpacesViewController } from '../controllers/public-spaces.view.controller'
import {
  PlainPublicSpace,
  PublicSpace,
} from '../interfaces/public-space.interface'
import { CheckboxDays } from './CheckboxDays'

type Props = {
  data?: PublicSpace
  closeModal: (refresh?: boolean) => void
}

export const PublicSpacesForm: FC<Props> = ({
  data,
  closeModal,
}) => {
  const [days, setDays] = useState<DynamicObject>({})

  useEffect(() => {
    if (data?.schedule.days) {
      // Transform from [1, 2, 3] to {Lunes: 1, Martes: 2, Miércoles: 3}
      const days = data.schedule.days
        .map((day) => ({ [DAYS_DICT[day]]: day }))
        .reduce((prev, curr) => ({ ...prev, ...curr }), {})
      setDays(days)
    }
  }, [])

  const publicSpaceViewController =
    usePublicSpacesViewController()

  const initialValue: PlainPublicSpace = {
    name: data?.name || '',
    maxPerHour: data?.schedule.maxPerHour || 1,
    rangeStartHour: data?.schedule.rangeStartHour || 8,
    rangeEndHour: data?.schedule.rangeEndHour || 18,
  }

  const handleSubmit = (values: PlainPublicSpace) => {
    data
      ? updatePublicSpace(values)
      : createPublicSpace(values)
  }

  const createPublicSpace = (values: PlainPublicSpace) => {
    publicSpaceViewController
      .createPublicSpace(values, days)
      .then((successfully) => {
        if (successfully) {
          closeModal(true)
        }
      })
  }

  const updatePublicSpace = (values: PlainPublicSpace) => {
    publicSpaceViewController
      .updatePublicSpace(data!.id!, values, days)
      .then((successfully) => {
        if (successfully) {
          closeModal(true)
        }
      })
  }

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="w-full">
          <Label htmlFor="name">
            Nombre del espacio público
          </Label>
          <Input
            className="w-full"
            name="name"
            type="text"
            placeholder="Nombre del espacio público"
          />
        </div>

        <div className="w-full">
          <Label htmlFor="name">Máximo de usuarios</Label>

          <Input
            className="w-full"
            name="maxPerHour"
            type="number"
            placeholder="Máximo de usuarios"
          />

          <small className="text-xs text-gray-400">
            Número de usuarios que pueden reservar en la
            misma hora
          </small>
        </div>

        <div className="flex w-full gap-1">
          <div>
            <Label htmlFor="name">Hora de inicio</Label>
            <Select
              className="w-full"
              formik={true}
              allowUndefined={false}
              name="rangeStartHour"
              placeholder="Hora de inicio"
            >
              {Object.entries(HOURS).map(
                ([label, value]) => (
                  <option value={value}>{label}</option>
                ),
              )}
            </Select>
            <small className="text-xs text-gray-400">
              Hora de apertura del espacio
            </small>
          </div>
          <div>
            <Label htmlFor="name">Hora de cierre</Label>
            <Select
              className="w-full"
              formik={true}
              allowUndefined={false}
              name="rangeEndHour"
              placeholder="Hora de cierre"
            >
              {Object.entries(HOURS).map(
                ([label, value]) => (
                  <option value={value}>{label}</option>
                ),
              )}
            </Select>

            <small className="text-xs text-gray-400">
              Hora de cierre del espacio
            </small>
          </div>
        </div>

        <CheckboxDays days={days} setDays={setDays} />

        <div className="flex flex-row-reverse gap-3 pt-3">
          <Button type="submit" color="primary">
            {data ? 'Actualizar' : 'Crear'}
          </Button>
          <Button color="link" onClick={() => closeModal()}>
            Cerrar
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
