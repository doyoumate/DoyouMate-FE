import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Banner, { Card } from '../components/Banner.tsx'
import card1 from '../../assets/images/card1.png'
import card2 from '../../assets/images/card2.png'
import { useQuery } from 'react-query'
import { getPopularPosts } from '../module/post/api.ts'
import { FadeIn } from 'react-native-reanimated'
import PostSummaryItem, { SkeletonPostSummaryItem } from '../components/post/PostSummaryItem.tsx'
import Text from '../components/common/Text.tsx'
import { AnimatedView } from '../components/common/Animated.tsx'
import { createSkeletonArray } from '../lib/util/skeleton.ts'

const cards: Card[] = [
  {
    image: card1,
    link: 'https://earlgrey02.com'
  },
  {
    image: card2,
    link: 'https://syu.ac.kr'
  }
]

const HomeScreen = () => {
  const { data: posts, isLoading } = useQuery(['getPopularPosts'], getPopularPosts, {
    refetchOnReconnect: true,
    refetchInterval: 18e5,
    refetchIntervalInBackground: true
  })

  return (
    <AnimatedView style={{ flex: 1 }} entering={FadeIn.duration(300)}>
      <SafeAreaView style={{ backgroundColor: 'rgb(100, 180, 255)' }} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          alwaysBounceVertical={false}
          bounces={false}>
          <View style={styles.title}>
            <Text
              style={{
                marginBottom: 4,
                fontSize: 23,
                color: 'white',
                fontWeight: 'light'
              }}>
              당신의 학교 생활 메이트,
            </Text>
            <Text
              style={{
                fontSize: 42,
                color: 'white',
                fontWeight: 'extra'
              }}>
              DoyouMate
            </Text>
          </View>
          <View style={styles.container}>
            <Banner cards={cards} />
            <View style={styles.board}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>
                게시판
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'light'
                }}>
                전공부터 시작해서 다양한 게시판에서 글을 작성해보세요.
              </Text>
              <View style={styles.posts}>
                {isLoading ? (
                  createSkeletonArray(2).map(index => <SkeletonPostSummaryItem key={index} />)
                ) : posts?.length === 0 ? (
                  <AnimatedView
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 160
                    }}
                    entering={FadeIn.duration(500)}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'normal'
                      }}>
                      게시글이 없습니다.
                    </Text>
                  </AnimatedView>
                ) : (
                  posts?.map(post => <PostSummaryItem post={post} key={post.id} />)
                )}
              </View>
            </View>
            <View style={styles.lecture}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>
                강의 조회
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'light'
                }}>
                원하는 강의를 검색해보세요.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AnimatedView>
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
    height: 260,
    paddingHorizontal: 20,
    paddingTop: 70,
    backgroundColor: 'rgb(100, 180, 255)'
  },
  board: {
    width: '100%',
    height: 280
  },
  posts: {
    flex: 1,
    gap: 10,
    marginTop: 14
  },
  lecture: {
    width: '100%',
    height: 120
  }
})

export default HomeScreen
