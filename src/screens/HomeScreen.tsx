import { Dimensions, ImageSourcePropType, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Animated, { Easing, FadeIn } from 'react-native-reanimated'
import { Carousel, Pagination } from 'react-native-snap-carousel'
import { useRef, useState } from 'react'
import BannerItem from '../components/BannerItem.tsx'
import card1 from '../../assets/images/card1.png'
import card2 from '../../assets/images/card2.png'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList } from '../navigators/navigation'
import { useQuery } from 'react-query'
import { getPopularPosts } from '../module/post/api.ts'
import PostWrapper from '../components/PostWrapper.tsx'

const cards: { image: ImageSourcePropType; link: string }[] = [
  {
    image: card1,
    link: 'https://www.earlgrey02.com'
  },
  {
    image: card2,
    link: 'https://www.syu.ac.kr'
  }
]

interface Props {
  navigation: StackNavigationProp<NavigatorParamList, 'home'>
}

const HomeScreen = () => {
  const [index, setIndex] = useState(0)
  const carousel = useRef(null)

  const { data, refetch } = useQuery(['getPopularPosts'], async () => await getPopularPosts(), {
    refetchInterval: 6e5,
    refetchIntervalInBackground: true
  })

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(1000).easing(Easing.out(Easing.quad))}>
      <SafeAreaView style={{ backgroundColor: 'rgb(140, 180, 255)' }} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          alwaysBounceVertical={false}
          bounces={false}>
          <View style={styles.title}>
            <Text
              style={{
                marginBottom: 2,
                fontFamily: 'NanumSquare_acL',
                fontSize: 26,
                color: 'white'
              }}>
              당신의 학교 생활 메이트,
            </Text>
            <Text
              style={{
                fontFamily: 'NanumSquare_acEB',
                fontSize: 40,
                color: 'white'
              }}>
              DoyouMate
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.banner}>
              <Carousel
                ref={carousel}
                data={cards}
                renderItem={({ item }) => <BannerItem image={item.image} link={item.link} />}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width * 0.85}
                onSnapToItem={slideIndex => setIndex(slideIndex)}
                inactiveSlideOpacity={1}
                enableSnap
                autoplay
                autoplayInterval={3000}
                vertical={false}
              />
            </View>
            <Pagination
              activeDotIndex={index}
              carouselRef={carousel}
              tappableDots={true}
              inactiveDotOpacity={0.6}
              inactiveDotScale={0.6}
              dotsLength={cards.length}
              containerStyle={{ marginTop: -40, gap: -10 }}
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
            <View style={styles.board}>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: 'NanumSquare_acB',
                  fontSize: 20
                }}>
                게시판
              </Text>
              <Text
                style={{
                  fontFamily: 'NanumSquare_acL',
                  fontSize: 15
                }}>
                전공부터 시작해서 다양한 게시판에서 글을 작성해보세요.
              </Text>
              <View style={styles.posts}>
                {data?.length === 0 ? (
                  <Animated.View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 160
                    }}
                    entering={FadeIn.duration(500)}>
                    <Text
                      style={{
                        fontFamily: 'NanumSquare_acR',
                        fontSize: 14
                      }}>
                      게시글이 없습니다.
                    </Text>
                  </Animated.View>
                ) : (
                  data?.map(post => <PostWrapper post={post} refetch={refetch} key={post.id} isSummary />)
                )}
              </View>
            </View>
            <View style={styles.lecture}>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: 'NanumSquare_acB',
                  fontSize: 20
                }}>
                강의 조회
              </Text>
              <Text
                style={{
                  fontFamily: 'NanumSquare_acL',
                  fontSize: 15
                }}>
                원하는 강의를 검색해보세요.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    marginTop: -50,
    paddingHorizontal: 20
  },
  title: {
    height: 250,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 68,
    backgroundColor: 'rgb(140, 180, 255)'
  },
  banner: {
    width: Dimensions.get('window').width,
    height: 130
  },
  board: {
    width: '100%',
    height: 280,
    alignItems: 'flex-start'
  },
  posts: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    marginTop: 14
  },
  lecture: {
    width: '100%',
    height: 120,
    alignItems: 'flex-start'
  }
})

export default HomeScreen
