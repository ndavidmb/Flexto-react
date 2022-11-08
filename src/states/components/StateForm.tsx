import { useFormik } from 'formik'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { InputChips } from '../../shared/components/InputChips/InputChips'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { emptyFields } from '../../shared/utils/emptyFields'
import { State } from '../interfaces/state.interface'
import { StateFromForm } from '../interfaces/stateFromForm.interface'
import { useStateService } from '../services/state.service'

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

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (emptyFields(values)) {
        return
      }

      dispatch(setLoading(true))
      if (data) {
        updateSta(values)
        return
      }
      createSta(values)
    },
  })

  const dispatch = useDispatch()

  const stateService = useStateService()

  const updateSta = (values: StateFromForm) => {
    stateService
      .updateState(data?.id as string, {
        affair: values.affair,
        detail: values.detail,
        state: values.state
          .split(',')
          .map((state) => state.trim()),
      })
      .then(() => {
        closeModal(true)
      })
      .finally(() => dispatch(setLoading(false)))
  }

  // Esto llama al service, y agrega un apartamento
  const createSta = (values: StateFromForm) => {
    const stateForService: State = {
      affair: values.affair,
      detail: values.detail,
      state: values.state
        .split(',')
        .map((state) => state.trim()),
    }
    stateService
      .addState(stateForService)
      .then(() => {
        closeModal(true)
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col text-gray-900">
        <label
          htmlFor="affair"
          className="font-semibold p-1"
        >
          Asunto
        </label>
        <input
          id="affair"
          name="affair"
          className="border bg-white px-2 py-1"
          placeholder="Asunto"
          onChange={formik.handleChange}
          value={formik.values.affair}
        />
      </div>
      <div className="flex flex-col text-gray-900">
        <label
          htmlFor="detail"
          className="font-semibold p-1"
        >
          Detalle
        </label>
        <input
          id="detail"
          name="detail"
          className="border bg-white px-2 py-1"
          placeholder="Detalle"
          onChange={formik.handleChange}
          value={formik.values.detail}
        />
      </div>
      <div className="flex flex-col w-full text-gray-900">
        <label
          htmlFor="state-chips"
          className="font-semibold p-1"
        >
          Estado
        </label>
        <InputChips
          className="w-full"
          id="state"
          name="state"
          formik={formik}
        />
      </div>
      <div className="flex flex-row-reverse gap-3 pt-3">
        <Button type="submit" color="primary">
          {data ? 'Actualizar' : 'Crear'}
        </Button>
        <Button color="link" onClick={() => closeModal()}>
          Cerrar
        </Button>
      </div>
    </form>
  )
}
