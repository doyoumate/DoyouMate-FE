import { StyleSheet, View } from 'react-native'
import { Ionicons } from '../../lib/icon/icons.ts'
import { PostResponse } from '../../module/post/types/response'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import { useRef, useState } from 'react'
import PostModal from './PostModal.tsx'
import Text from '../common/Text.tsx'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { FadeIn } from 'react-native-reanimated'
import { AnimatedView } from '../common/Animated.tsx'
import useLike from '../../module/post/hooks/useLike.ts'
import useComment from '../../module/post/hooks/useComment.ts'

interface Props {
  post: PostResponse
}

const PostSummaryItem = ({ post }: Props) => {
  const likeStates = useLike(post)
  const { isLiked, count: likeCount, likeHandler } = likeStates
  const commentStates = useComment(post)
  const { count: commentCount } = commentStates
  const [modal, setModal] = useState(false)
  const doubleTapRef = useRef<TapGestureHandler>(null)

  return (
    <>
      <GestureHandlerRootView>
        <TapGestureHandler waitFor={doubleTapRef} onActivated={() => setModal(true)}>
          <TapGestureHandler ref={doubleTapRef} numberOfTaps={2} onActivated={likeHandler}>
            <AnimatedView entering={FadeIn.duration(500)} style={styles.container}>
              <View style={styles.profile}>
                <Ionicons name="person-circle-sharp" size={18} color="rgb(180, 180, 180)" />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 'bold'
                  }}>
                  두유
                </Text>
              </View>
              <View style={styles.body}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}
                  numberOfLines={1}>
                  {post.title}
                </Text>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 11
                  }}
                  numberOfLines={1}>
                  {post.content}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 10.5,
                    color: 'rgb(140, 140, 140)'
                  }}>
                  {post.board.name} 게시판
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2
                    }}>
                    <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={12} color="red" />
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 10,
                        color: 'red'
                      }}>
                      {likeCount}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2
                    }}>
                    <Ionicons name="chatbubble-outline" size={12} color="rgb(140, 180, 255)" />
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 10,
                        color: 'rgb(140, 180, 255)'
                      }}>
                      {commentCount}
                    </Text>
                  </View>
                </View>
              </View>
            </AnimatedView>
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
    </>
  )
}

const SkeletonPostSummaryItem = () => {
  return (
    <ContentLoader speed={0.5} width="100%" height="100" backgroundColor="#ebebeb" foregroundColor="#e1e1e1">
      <Rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
    </ContentLoader>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 100,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgb(250, 250, 250)'
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  body: {
    gap: 6,
    marginTop: 7,
    marginBottom: 9
  }
})

export { SkeletonPostSummaryItem }
export default PostSummaryItem
