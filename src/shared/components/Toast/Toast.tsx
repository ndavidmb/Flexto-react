import { useEffect } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks'
import { hiddenToast } from '../../store/slices/toast/toastSlice'
import { RootState } from '../../store/store'
import { ToastList } from '../../styled-components/ToastList'
import styles from './Toast.module.scss'

const TEXT_COLORS = {
  error: 'text-red-700',
  info: 'text-blue-700',
  success: 'text-green-700',
  warning: 'text-yellow-700',
}

const BG_COLORS = {
  error: 'bg-red-100',
  info: 'bg-blue-100',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
}

const BG_LIGHTER = {
  error: 'bg-red-200',
  info: 'bg-blue-200',
  success: 'bg-green-200',
  warning: 'bg-yellow-200',
}

const BG_DARK = {
  error: 'bg-red-700',
  info: 'bg-blue-700',
  success: 'bg-green-700',
  warning: 'bg-yellow-700',
}

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
          <div className="relative">
            <span
              className={`w-full h-1 absolute ${
                BG_LIGHTER[toastState.type]
              } rounded-lg`}
            ></span>
            <span
              className={`
              ${styles['animated-load']}
              h-1 absolute 
              ${BG_DARK[toastState.type]}
              rounded-lg`}
            ></span>
          </div>
          <div className="flex p-4">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div>
              <span className="font-medium">
                {toastState.title}:
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
