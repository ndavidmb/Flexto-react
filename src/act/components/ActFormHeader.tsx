import React from 'react'
import { Card } from '../../shared/styled-components/Card'

export const ActFormHeader = () => {
  return (
    <Card>
      <div className="flex uppercase flex-col items-center justify-center mb-4">
        <h2 className="flex items-center gap-1">
          Acta{' '}
          <input
            type="text"
            name="title"
            placeholder="TITULO"
            className="border indent-2"
          />
        </h2>
        <span className=" font-bold">
          del{' '}
          <input
            type="text"
            name="year"
            placeholder="AÑO"
            className="border indent-2 w-14"
          />{' '}
          asamblea general ordinaria de copropietarios
        </span>
      </div>
      <p>
        De conformidad con la convocatoria realizada el{' '}
        <input
          name="madeFor"
          type="text"
          className="border indent-2"
          placeholder="realizada para"
        />{' '}
        mediante los medios dispuestos para ello según los
        estatutos y la ley (
        <input
          name="law"
          type="text"
          placeholder="ley"
          className="border indent-2"
        />
        ), siendo las{' '}
        <input
          name="hour"
          type="time"
          placeholder="hora"
          className="border indent-2 w-24"
        />{' '}
        del{' '}
        <input
          name="act_date"
          type="date"
          className="border indent-2"
        />{' '}
        se reunieron en la{' '}
        <input
          name="city"
          type="text"
          placeholder="ciudad"
          className="border indent-2"
        />{' '}
        de la ciudad de{' '}
        <input
          name="property"
          type="text"
          placeholder="propiedad"
          className="border indent-2"
        />{' '}
        los copropietarios de{' '}
        <input
          name="property"
          type="text"
          placeholder="propiedad"
          className="border indent-2"
        />{' '}
        en la forma que se indica a continuación:
      </p>
    </Card>
  )
}
