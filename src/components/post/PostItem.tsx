import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '../../lib/icon/icons.ts'
import { toElapsedTime } from '../../lib/util/date.ts'
import { PostResponse } from '../../module/post/types/response'
import { Gesture, GestureDetector, GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import { useRef, useState } from 'react'
import PostModal from './PostModal.tsx'
import { RouteProp, useRoute } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import { FadeIn } from 'react-native-reanimated'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'
import Text from '../common/Text.tsx'
import { AnimatedView } from '../common/Animated.tsx'
import ImageSlide from './ImageSlide.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import useLike from '../../module/post/hooks/useLike.ts'
import useComment from '../../module/post/hooks/useComment.ts'

interface Props {
  post: PostResponse
}

const PostItem = ({ post }: Props) => {
  const route = useRoute<RouteProp<NavigatorParamList>>()
  const likeStates = useLike(post)
  const { isLiked, count: likeCount, likeHandler } = likeStates
  const commentStates = useComment(post)
  const { count: commentCount } = commentStates
  const [modal, setModal] = useState(false)
  const [index, setIndex] = useState(0)
  const doubleTapRef = useRef<TapGestureHandler>(null)
  const likeRef = useRef<TouchableOpacity>(null)

  return (
    <AnimatedView entering={FadeIn.duration(500)}>
      <GestureHandlerRootView>
        <TapGestureHandler waitFor={doubleTapRef} onActivated={() => setModal(true)}>
          <TapGestureHandler ref={doubleTapRef} numberOfTaps={2} onActivated={() => likeHandler()}>
            <View style={styles.container}>
              <View style={styles.profile}>
                <Ionicons name="person-circle-sharp" size={35} color="rgb(180, 180, 180)" />
                <View style={{ gap: 2 }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 12.5
                    }}>
                    두유
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 10.5,
                      color: 'grey'
                    }}>
                    {post.writer.major} {post.writer.grade}학년
                  </Text>
                </View>
              </View>
              {post.images.length > 0 && (
                <View style={styles.images}>
                  <ImageSlide images={post.images} index={index} setIndex={setIndex} />
                </View>
              )}
              <View style={{ paddingHorizontal: 12 }}>
                <View style={styles.body}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13
                    }}
                    numberOfLines={1}>
                    {post.title}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 12,
                      lineHeight: 18
                    }}
                    numberOfLines={5}>
                    {post.content}
                  </Text>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4
                      }}>
                      <GestureDetector gesture={Gesture.Tap()}>
                        <TouchableScale ref={likeRef} activeScale={0.8} activeOpacity={0.8} onPress={likeHandler}>
                          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color="red" />
                        </TouchableScale>
                      </GestureDetector>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'red',
                          fontWeight: 'bold'
                        }}>
                        {likeCount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4
                      }}>
                      <TouchableScale activeScale={0.8} activeOpacity={0.8}>
                        <Ionicons name="chatbubble-outline" size={22} color="rgb(140, 180, 255)" />
                      </TouchableScale>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'rgb(140, 180, 255)',
                          fontWeight: 'bold'
                        }}>
                        {commentCount}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    {route.name === 'board' ? (
                      <Text
                        style={{
                          marginVertical: 10,
                          fontSize: 10,
                          color: 'grey',
                          fontWeight: 'light'
                        }}>
                        {toElapsedTime(post.createdDate)}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          marginVertical: 10,
                          fontWeight: 'light',
                          fontSize: 10,
                          color: 'grey'
                        }}>
                        {post.board.name} 게시판
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </TapGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>
      <PostModal
        isVisible={modal}
        setIsVisible={setModal}
        post={post}
        likeStates={likeStates}
        commentStates={commentStates}
      />
    </AnimatedView>
  )
}

const SkeletonPostItem = () => {
  return (
    <ContentLoader speed={0.5} width="100%" height={500} backgroundColor="#ebebeb" foregroundColor="#e1e1e1">
      <Circle cx="10%" cy="27" r="19" />
      <Rect x="17%" y="13" rx="2" ry="2" width="66" height="13" />
      <Rect x="17%" y="33" rx="2" ry="2" width="107" height="9" />
      <Rect x="5%" y="60" rx="2" ry="2" width="90%" height="327" />
      <Rect x="6%" y="400" rx="2" ry="2" width="76" height="14" />
      <Rect x="6%" y="422" rx="2" ry="2" width="186" height="10" />
      <Circle cx="10%" cy="458" r="15" />
      <Circle cx="20%" cy="458" r="15" />
    </ContentLoader>
  )
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  images: { marginVertical: 8 },
  body: {
    gap: 4,
    marginVertical: 8
  }
})

export { SkeletonPostItem }
export default PostItem
