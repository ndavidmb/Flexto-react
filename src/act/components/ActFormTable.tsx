import { Field, Form, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { Card } from '../../shared/styled-components/Card'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'

interface CoOwner {
  id: number
  owner: string
  unity: string
  propertyCoefficient: string
  modalityState: 'presente' | 'representando'
}

export const ActFormTable = () => {
  const [coOwners, setCoOwners] = useState<CoOwner[]>([])
  const formEl = useRef<HTMLFormElement>(null)

  const handleAddRow = (
    ev: React.FormEvent<HTMLFormElement>,
  ) => {
    ev.preventDefault()
    const formData = new FormData(
      formEl.current ?? undefined,
    )
    const data = Object.fromEntries(
      formData,
    ) as unknown as CoOwner

    formEl.current?.reset()

    setCoOwners([
      ...coOwners,
      { ...data, id: new Date().getTime() },
    ])
  }

  const handleDelete = (id: number) => {
    const co = coOwners.filter((c) => c.id !== id)
    setCoOwners(co)
  }

  return (
    <Card>
      <form onSubmit={handleAddRow} ref={formEl}>
        <Table>
          <THead>
            <th>Propietario</th>
            <th>Unidad</th>
            <th>Coeficiente de copropiedad</th>
            <th>Presente o representado</th>
            <th>Acción</th>
          </THead>
          <tbody className="!max-h-96">
            <TRow index={0}>
              <td>
                <input
                  type="text"
                  name="owner"
                  placeholder="Propietario"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="unity"
                  placeholder="Unidad"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="propertyCoefficient"
                  placeholder="Cte. copropiedad"
                />
              </td>
              <td>
                <select name="modalityState">
                  <option value="Presente">Presente</option>
                  <option value="Representado">
                    Representado
                  </option>
                </select>
              </td>
              <td>
                <Button type="submit" color="primary">
                  Agregar
                </Button>
              </td>
            </TRow>
            {coOwners.map((coOwner, index) => (
              <TRow index={index + 1} key={coOwner.id}>
                <td>{coOwner.owner}</td>
                <td>{coOwner.unity}</td>
                <td>{coOwner.propertyCoefficient}</td>
                <td>{coOwner.modalityState}</td>
                <td>
                  <Button
                    onClick={() => handleDelete(coOwner.id)}
                    type="button"
                    color="warning"
                  >
                    Eliminar
                  </Button>
                </td>
              </TRow>
            ))}
          </tbody>
        </Table>
      </form>
    </Card>
  )
}
