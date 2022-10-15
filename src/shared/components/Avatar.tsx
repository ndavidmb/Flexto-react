import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const Avatar = () => {
  const { email, photoURL, displayName } = useSelector(
    (state: RootState) => state.authState,
  )

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="rounded-full p-1 h-16 w-16 border">
        <img
          src={photoURL || undefined}
          className="object-cover rounded-full h-full"
          alt="avatar"
        />
      </div>
      <h3 className="text-white flex flex-col text-center font-semibold pt-2">
        {displayName}
        <small className="font-normal text-gray-400">
          {email}
        </small>
      </h3>
    </div>
  )
}
