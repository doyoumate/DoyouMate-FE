import { ImageProps, View } from 'react-native'
import { AnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import { ReactNode, useEffect, useState } from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { AnimatedImage } from './Animated.tsx'

type LoadableImageProps = Omit<AnimatedProps<ImageProps>, 'fadeDuration'> & {
  skeleton?: ReactNode
  fadeDuration?: number
}

const LoadableImage = ({ skeleton, fadeDuration = 0, ...props }: LoadableImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (!isLoading) opacity.value = withTiming(1, { duration: fadeDuration })
  }, [isLoading])

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View
          style={{
            display: 'flex',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            zIndex: 99
          }}>
          {skeleton}
        </View>
      )}
      <AnimatedImage
        {...props}
        style={[{ flex: 1 }, props.style, { opacity }]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  )
}

const SkeletonImage = () => {
  return (
    <ContentLoader speed={0.5} width="100%" height="100%" backgroundColor="#ebebeb" foregroundColor="#e1e1e1">
      <Rect x="0" y="0" rx="15" ry="15" width="100%" height="100%" />
    </ContentLoader>
  )
}

export type { LoadableImage }
export { SkeletonImage }
export default LoadableImage
