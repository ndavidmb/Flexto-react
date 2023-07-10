export function parseHour(hour: number) {
  const suffix = hour > 12 ? 'PM' : 'AM'
  const formattedHour = hour > 12 ? hour - 12 : hour
  return `${formattedHour} ${suffix}`
}
