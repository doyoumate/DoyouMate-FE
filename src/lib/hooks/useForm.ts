import { InputStates } from './useInput.ts'
import { useCallback, useMemo } from 'react'

interface FormStates {
  isSubmittable: boolean
  focusedInput?: string
  resetHandler: () => void
}

const useForm = (...inputStates: InputStates[]): FormStates => {
  const isSubmittable = useMemo(
    () => inputStates.filter(({ validity }) => !validity).length === 0,
    inputStates.map(({ value }) => value)
  )
  const focusedInput = useMemo(() => inputStates.filter(({ isFocused }) => isFocused)[0]?.inputKey, [inputStates])
  const resetHandler = useCallback(() => {
    inputStates.forEach(({ setValue }) => setValue(''))
  }, [])

  return { isSubmittable, resetHandler, focusedInput }
}

export default useForm
