import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { State } from '../interfaces/state.interface'
import { StateFromForm } from '../interfaces/stateFromForm.interface'
import { StateService } from '../services/state.service'


// Estos varían en el tipo de la data
type Props = {
  data?: State
  closeModal: (refresh?: boolean) => void

}

// Esto varía dependiendo de los datos que necesite llenar
export const StateForm: FC<Props> = ({
  data,
  closeModal,
}) => {
  const initialValues = {
    // Si es string
    affair: data?.affair || '',
    detail: data?.detail || '',
    state: data?.state ? data.state.join(',') : '',
  }

  const dispatch = useDispatch()

  const stateService = StateService()

  const handleSubmit = (values: StateFromForm) => {
    // Pone el spinner a andar
    dispatch(setLoading(true))

    if (data) {
      updateSta(values)
      return
    }

    createSta(values)
  }

  const updateSta = (values: StateFromForm) => {
    stateService.
    updateState(data?.id as string,{
      affair: values.affair,
      detail: values.detail,
      state: values.state.split(','),
    })
      .then(() => {
        closeModal(true)
      })
      .finally(() => dispatch(setLoading(false)))
  }

  // Esto llama al service, y agrega un apartamento
  const createSta = (values: StateFromForm) => {
    stateService.
    addState({
      // Se pasa de número a string
      affair: values.affair,
      detail: values.detail,
      state: values.state.split(','),
    })
      .then(() => {
        closeModal(true)
      })
      .finally(() => dispatch(setLoading(false)))
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-2">
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="affair"
            className="font-semibold p-1"
          >
            Asunto
          </label>
          <Field
            id="affair"
            name="affair"
            className="border bg-white px-2 py-1"
            placeholder="Asunto"
          />
        </div>
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="detail"
            className="font-semibold p-1"
          >
            Detalle
          </label>
          <Field
            id="detail"
            name="detail"
            className="border bg-white px-2 py-1"
            placeholder="Detalle"
          />
        </div>
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="state"
            className="font-semibold p-1"
          >
            Estado
          </label>
          <Field
            id="state"
            name="state"
            className="border bg-white px-2 py-1"
          ></Field>
        </div>
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
