import { useEffect } from 'react'
import {
  TEXT_COLORS,
  BG_COLORS,
} from '../../constants/colors-cases.constants'
import { ToastIcon } from '../../icons/ToastIcon'
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks'
import { hiddenToast } from '../../store/slices/toast/toastSlice'
import { RootState } from '../../store/store'
import { ToastList } from '../../styled-components/ToastList'
import styles from './Toast.module.scss'
import { ToastLoading } from './ToastLoading'

export const Toast = () => {
  const toastState = useAppSelector(
    (state: RootState) => state.toastState,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (toastState.triggerToast) {
      setTimeout(() => {
        dispatch(hiddenToast())
      }, 8000)
    }
  }, [toastState.triggerToast])

  return (
    <>
      {toastState.triggerToast && (
        <div
          className={`
            absolute
            w-1/4
            z-20
            right-1
            bottom-2
            shadow
            text-sm
            rounded-lg
            ${TEXT_COLORS[toastState.type]}
            ${BG_COLORS[toastState.type]}
            ${styles['animated-soft-container']}
          `}
          role="alert"
        >
          <ToastLoading type={toastState.type} />
          <div className="flex p-4">
            <ToastIcon />
            <div>
              <span className="font-medium">
                {toastState.title}{toastState.details.length > 0 && ':'}
              </span>

              <ToastList
                textColor={TEXT_COLORS[toastState.type]}
              >
                {toastState.details.map((detail, i) => (
                  <li key={`${i}/${detail}`}>{detail}</li>
                ))}
              </ToastList>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
