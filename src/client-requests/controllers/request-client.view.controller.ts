import { useRequestModelController } from './request.model.controller'

export const useRequestClientViewController = () => {
  const requestModelController = useRequestModelController()
  const getOwnerRequest = async (uid: string) => {
    return await requestModelController.getOwnerRequest(uid)
  }

  return { getOwnerRequest }
}
