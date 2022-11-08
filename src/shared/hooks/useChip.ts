import { useEffect, useState } from 'react'

export function useChip(initialValue: string) {
  const [colspanSize, setColspanSize] = useState(0)
  const [chips, setChips] = useState<string[]>([])
  const [hidden, setHidden] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [formValue, setFormValue] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (initialValue) {
      const initialChips = initialValue
        .split(',')
        .map((item) => item.trim())
      setChips(initialChips)
    }
  }, [initialValue])

  useEffect(() => {
    const length = chips.length

    setFormValue(chips.join(','))
    if (length === 0 || length % 4 === 0) {
      setColspanSize(1)
      setHidden(false)
      return
    }

    for (let i = 1; i < 4; i++) {
      const divider = length - i
      if (divider % 4 === 0) {
        setColspanSize(i + 1)
        setHidden(false)
        break
      }
    }
  }, [chips])

  const handleKey = (
    evt: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (evt.code === 'Comma') {
      evt.preventDefault()
      if (chips.some((chip) => chip === inputValue)) {
        setErrorMsg('Ya agrego este estado')
        return
      }
      setInputValue('')
      setHidden(true)
      setChips([...chips, inputValue])
    }

    if (
      evt.code === 'Backspace' &&
      inputValue.length === 0
    ) {
      setChips(
        chips.filter(
          (_, index) => index + 1 !== chips.length,
        ),
      )
    }
  }

  const handleChangeValue = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (errorMsg) {
      setErrorMsg('')
    }
    setInputValue(evt.target.value)
  }

  const handleDelete = (value: string) => {
    setChips(chips.filter((f) => f !== value))
  }

  return {
    colspanSize,
    chips,
    errorMsg,
    inputValue,
    hidden,
    handleDelete,
    handleChangeValue,
    handleKey,
    formValue,
  }
}
