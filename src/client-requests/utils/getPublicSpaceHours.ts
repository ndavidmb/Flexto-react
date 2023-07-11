import { HOURS } from '../../public-spaces/constants/hours'

export function getPublicSpaceHours(
  startHour: number,
  endHour: number,
) {
  const startHours: Record<string, number> = {}
  const endHours: Record<string, number> = {}

  Object.entries(HOURS)
    .filter(
      ([_, hour]) => hour >= startHour && hour <= endHour,
    )
    .forEach(([label, hour], index, arr) => {
      if (index === 0) {
        startHours[label] = hour
        return
      }

      if (index === arr.length - 1) {
        endHours[label] = hour
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
