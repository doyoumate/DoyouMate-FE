import { DependencyList, useEffect, useState } from 'react'

const useDebouncedValue = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, value])

  return debouncedValue
}

const useDebouncing = (action: () => any, delay: number, deps: DependencyList) => {
  useEffect(() => {
    const timer = setTimeout(action, delay)

    return () => clearTimeout(timer)
  }, deps)
}

export { useDebouncedValue, useDebouncing }
