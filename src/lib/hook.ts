import { DependencyList, useEffect } from 'react'

const useAsyncEffect = (effect: () => Promise<void>, deps?: DependencyList) => {
  useEffect(() => {
    effect()
  }, deps)
}

export { useAsyncEffect }
