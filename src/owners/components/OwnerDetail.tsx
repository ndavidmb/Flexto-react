import { Form, Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import {
  IoArrowBack,
  IoSave,
  IoTerminal,
} from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DefaultContainer } from '../../shared/components/DefaultContainer/DefaultContainer'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { ButtonLink } from '../../shared/styled-components/ButtonLink'
import { PageTitle } from '../../shared/styled-components/PageTitle'
import { Select } from '../../shared/styled-components/Select'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { useStateService } from '../../states/services/state.service'
import { OwnerWithStates } from '../interfaces/owner.interface'
import { useOwnerService } from '../services/owner.service'

export const OwnerDetail = () => {
  // State
  const [owner, setOwner] = useState<OwnerWithStates>()
  const [selectValues, setSelectValues] = useState<
    {
      id: string
      state: string | undefined
    }[]
  >([])

  // React Hooks
  const dispatch = useDispatch()
  const { ownerId } = useParams()

  // Services
  const ownerService = useOwnerService()
  const stateService = useStateService()

  // Life cycle
  useEffect(() => {
    if (!ownerId) {
      return
    }

    dispatch(setLoading(true))

    Promise.all([
      ownerService.getOwnerById(ownerId),
      stateService.getStates(),
    ])
      .then(([owner, states]) => {
        setOwner({
          ...owner,
          states,
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }, [])

  useEffect(() => {
    if (!owner) {
      return
    }

    const initialValues = owner.states.map((state) => ({
      id: state.id!,
      state: undefined,
    }))
    setSelectValues(initialValues)
  }, [owner])

  // Functions
  const handleSave = () => {
    console.log(selectValues)
  }

  const changeSelectedValues = (
    stateIndex: number,
    value: string,
  ) => {
    const changeSelected = selectValues.map((val, i) =>
      i === stateIndex
        ? {
            ...val,
            state: value,
          }
        : val,
    )
    setSelectValues(changeSelected)
  }

  return (
    <DefaultContainer>
      <header className="px-8 py-3 flex justify-between items-start">
        <div>
          <PageTitle>{owner?.name}</PageTitle>
          <ul className="text-gray-600">
            <li>{owner?.phone}</li>
            <li>{owner?.email}</li>
            <li>
              {owner?.apartment.apartmentNumber} -{' '}
              {owner?.apartment.tower}
            </li>
          </ul>
        </div>

        <div className="flex gap-1 items-center mt-1">
          <ButtonLink href="..">
            <IoArrowBack />
            Volver
          </ButtonLink>
          <Button
            className="flex gap-2"
            type="button"
            color="primary"
            onClick={() => handleSave()}
          >
            <IoSave />
            Guardar
          </Button>
        </div>
      </header>

      <div className="px-4">
        <Table>
          <THead>
            <th scope="col">Asunto</th>
            <th scope="col">Detalle</th>
            <th scope="col">Estados</th>
          </THead>
          <tbody>
            {owner?.states.map((state, index) => {
              return (
                <TRow index={index}>
                  <th scope="row">{state.affair}</th>
                  <td>{state.detail}</td>
                  <td>
                    <Select
                      value={selectValues[index]?.state}
                      onChange={({ target }) => {
                        changeSelectedValues(
                          index,
                          target.value,
                        )
                      }}
                      id={state.id!}
                      name="state"
                    >
                      {state.state.map((strState) => (
                        <option value={strState}>
                          {strState}
                        </option>
                      ))}
                    </Select>
                  </td>
                </TRow>
              )
            })}
          </tbody>
        </Table>
      </div>
    </DefaultContainer>
  )
}
