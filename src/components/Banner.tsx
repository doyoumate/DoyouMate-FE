import { Dimensions, ImageSourcePropType, Linking, StyleSheet, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import TouchableScale from './common/TouchableScale.tsx'
import { useState } from 'react'
import LoadableImage, { SkeletonImage } from './common/LoadableImage.tsx'

interface Props {
  cards: Card[]
}

interface Card {
  image: ImageSourcePropType
  link: string
}

const Banner = ({ cards }: Props) => {
  const [index, setIndex] = useState(0)

  return (
    <>
      <View style={styles.container}>
        <Carousel
          data={cards}
          renderItem={({ item }) => (
            <TouchableScale style={styles.image} onPress={() => Linking.openURL(item.link)}>
              <LoadableImage
                source={item.image}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12
                }}
                fadeDuration={300}
                resizeMode="cover"
                skeleton={<SkeletonImage />}
              />
            </TouchableScale>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.85}
          onSnapToItem={index => setIndex(index)}
          autoplay
          autoplayInterval={3000}
          vertical={false}
          inactiveSlideOpacity={0.95}
          inactiveSlideScale={0.9}
        />
      </View>
      <Pagination
        activeDotIndex={index}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
        dotsLength={cards.length}
        containerStyle={{
          gap: -10,
          marginBottom: 8,
          paddingVertical: 0
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 18,
          backgroundColor: 'rgb(140, 180, 255)'
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          backgroundColor: 'rgb(200, 200, 200)'
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 3.5
  },
  image: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: 'rgb(180, 180, 180)',
    shadowOffset: {
      width: 0,
      height: 0.3
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  }
})

export type { Card }
export default Banner
