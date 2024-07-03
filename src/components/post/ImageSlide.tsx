import { ActivityIndicator, Dimensions, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import LoadableImage from '../common/LoadableImage.tsx'
import { Dispatch, SetStateAction, useRef } from 'react'

interface Props {
  images: string[]
  index: number
  setIndex: Dispatch<SetStateAction<number>>
}

const ImageSlide = ({ images, index, setIndex }: Props) => {
  const carouselRef = useRef<Carousel<string>>(null)

  return (
    <View>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width,
          marginBottom: 10
        }}>
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={({ item }) => (
            <LoadableImage source={{ uri: item }} fadeDuration={300} skeleton={<ActivityIndicator size="large" />} />
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={index => setIndex(index)}
          disableIntervalMomentum
          vertical={false}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onContentSizeChange={() => carouselRef.current?.snapToItem(index)}
        />
      </View>
      <Pagination
        activeDotIndex={index}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
        dotsLength={images.length}
        containerStyle={{
          gap: -10,
          marginTop: 5,
          paddingVertical: 0
        }}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 18,
          backgroundColor: 'rgb(180, 180, 180)'
        }}
        inactiveDotStyle={{
          width: 6,
          height: 6,
          backgroundColor: 'rgb(200, 200, 200)'
        }}
      />
    </View>
  )
}

export default ImageSlide
