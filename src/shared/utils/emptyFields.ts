export const emptyFields = (values: any) => {
  return Object.values(values).some(
    (value) => value !== false && value !== 0 && !value,
  )
}
