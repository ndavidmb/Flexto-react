import { useAppSelector } from '../store/hooks'

export const Avatar = () => {
  const { email, photoUrl, displayName } = useAppSelector(
    (state) => state.authState,
  )

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="rounded-full p-1 h-32 w-32 border flex items-center justify-center">
        <img
          src={photoUrl || undefined}
          className="object-cover rounded-full !h-full w-full"
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
