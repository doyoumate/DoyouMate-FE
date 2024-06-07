import { DependencyList, useEffect } from 'react'

const useDebouncing = (action: () => void, delay: number, deps: DependencyList) => {
  useEffect(() => {
    const timer = setTimeout(action, delay)

    return () => clearTimeout(timer)
  }, deps)
}

export { useDebouncing }
