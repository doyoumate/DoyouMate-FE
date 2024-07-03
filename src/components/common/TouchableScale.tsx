import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { AnimatedView } from './Animated.tsx'

type TouchableScaleProps = TouchableOpacityProps & {
  activeScale?: number
  containerStyle?: StyleProp<ViewStyle>
}

const hitSlop = {
  top: 8,
  left: 8,
  right: 8,
  bottom: 8
}

const TouchableScale = ({ activeScale = 0.95, containerStyle, ...props }: TouchableScaleProps) => {
  const scale = useSharedValue(1)

  return (
    <TouchableOpacity
      hitSlop={hitSlop}
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
      <AnimatedView style={[containerStyle, { transform: [{ scale }] }]}>{props.children}</AnimatedView>
    </TouchableOpacity>
  )
}

export type { TouchableScaleProps }
export default TouchableScale
