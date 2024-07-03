import { ActivityIndicator, Dimensions, Share } from 'react-native'
import { Dispatch, SetStateAction, useRef } from 'react'
import Carousel from 'react-native-snap-carousel'
import TouchableScale from '../common/TouchableScale.tsx'
import Modal from '../common/Modal.tsx'
import LoadableImage from '../common/LoadableImage.tsx'

interface Props {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  images: string[]
  index: number
}

const ImageModal = ({ isVisible, setIsVisible, images, index }: Props) => {
  const carouselRef = useRef<Carousel<string>>(null)

  return (
    <Modal
      style={{ flex: 1 }}
      containerStyle={{ height: Dimensions.get('window').width }}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      swipeDirection="down"
      propagateSwipe
      onSwipeComplete={() => setIsVisible(false)}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={({ item }) => (
          <TouchableScale
            activeScale={0.98}
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onLongPress={() => Share.share({ message: item })}>
            <LoadableImage source={{ uri: item }} fadeDuration={300} skeleton={<ActivityIndicator size="large" />} />
          </TouchableScale>
        )}
        keyExtractor={item => item}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        disableIntervalMomentum
        vertical={false}
        firstItem={index}
        inactiveSlideOpacity={0.9}
        inactiveSlideScale={0.9}
      />
    </Modal>
  )
}

export default ImageModal
