import { HOURS_STRING_TO_NUM } from '../../public-spaces/constants/hours'

export function getPublicSpaceHours(
  startHour: number,
  endHour: number,
) {
  const startHours: Record<string, number> = {}
  const endHours: Record<string, number> = {}

  Object.entries(HOURS_STRING_TO_NUM)
    .filter(
      ([_, hour]) => hour >= startHour || hour <= endHour,
    )
    .forEach(([label, hour]) => {
      if (hour === endHour) {
        endHours[label] = hour
        return
      }

      if (hour === startHour) {
        startHours[label] = hour
        return
      }

      startHours[label] = hour
      endHours[label] = hour
    })

  return {
    startHours: Object.entries(startHours),
    endHours: Object.entries(endHours),
  }
}
