import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { AnimatedView } from './Animated.tsx'
import { ForwardedRef, forwardRef } from 'react'

type TouchableScaleProps = TouchableOpacityProps & { activeScale?: number }

const TouchableScale = ({ activeScale = 0.95, ...props }: TouchableScaleProps, ref: ForwardedRef<TouchableOpacity>) => {
  const scale = useSharedValue(1)

  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={1}
      {...props}
      onPressIn={() => (scale.value = withTiming(activeScale, { duration: 200 }))}
      onPressOut={() => (scale.value = withTiming(1, { duration: 300 }))}
      onLongPress={e => {
        scale.value = withTiming(activeScale, { duration: 200 })
        if (props.onLongPress) {
          props.onLongPress(e)
          scale.value = withTiming(1, { duration: 500 })
        }
      }}>
      <AnimatedView style={[props.style, { transform: [{ scale }] }]}>{props.children}</AnimatedView>
    </TouchableOpacity>
  )
}

export type { TouchableScaleProps }
export default forwardRef(TouchableScale)
