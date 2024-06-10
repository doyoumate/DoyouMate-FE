import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

interface StackEffectStates {
  setIsNavigated: Dispatch<SetStateAction<boolean>>
}

const useStackEffect = (callback: () => void) => {
  const isFocused = useIsFocused()
  const [isNavigated, setIsNavigated] = useState(false)

  useEffect(() => {
    if (isNavigated && isFocused) {
      callback()
      setIsNavigated(false)
    }
  }, [isFocused])

  return { setIsNavigated }
}

export type { StackEffectStates }
export default useStackEffect
