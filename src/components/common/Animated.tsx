import Animated from 'react-native-reanimated'
import { forwardRef } from 'react'
import Text from './Text.tsx'

const AnimatedView = Animated.View
const AnimatedText = Animated.createAnimatedComponent(forwardRef(Text))
const AnimatedImage = Animated.Image

export { AnimatedView, AnimatedText, AnimatedImage }
