import Animated from 'react-native-reanimated'
import Text from './Text.tsx'

const AnimatedView = Animated.View
const AnimatedText = Animated.createAnimatedComponent(Text)
const AnimatedImage = Animated.Image

export { AnimatedView, AnimatedText, AnimatedImage }
