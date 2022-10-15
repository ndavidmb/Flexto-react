import { FC } from 'react'
import {
  BG_DARK,
  BG_LIGHTER,
} from '../../constants/colors-cases.constants'
import { ToastType } from '../../store/slices/toast/toastSlice'
import styles from './Toast.module.scss'

type Props = { type: ToastType }

export const ToastLoading: FC<Props> = ({ type }) => {
  return (
    <div className="relative">
      <span
        className={`w-full h-1 absolute ${BG_LIGHTER[type]} rounded-lg`}
      ></span>
      <span
        className={`
              ${styles['animated-load']}
              h-1 absolute 
              ${BG_DARK[type]}
              rounded-lg`}
      ></span>
    </div>
  )
}
