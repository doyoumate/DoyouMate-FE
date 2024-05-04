import { PostResponse } from '../module/post/dto/response'
import { useState } from 'react'
import { useLike } from '../module/post/hook.ts'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import PostSummaryItem from './PostSummaryItem.tsx'
import PostModal from './PostModal.tsx'
import Animated, { Easing, FadeIn } from 'react-native-reanimated'
import PostItem from './PostItem.tsx'

interface Props {
  post: PostResponse
  refetch: () => Promise<unknown>
  isSummary?: boolean
}

const PostWrapper = ({ post, refetch, isSummary = false }: Props) => {
  const [modal, setModal] = useState(false)
  const [postId, setPostId] = useState<string>()
  const { like, isLiked, likeHandler } = useLike(post)

  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setPostId(post.id)
          setModal(true)
        }}>
        {isSummary ? (
          <PostSummaryItem post={post} like={like} />
        ) : (
          <Animated.View entering={FadeIn.duration(500).easing(Easing.inOut(Easing.quad))}>
            <PostItem post={post} like={like} isLiked={isLiked} likeHandler={likeHandler} />
            <View style={styles.line} />
          </Animated.View>
        )}
      </TouchableOpacity>
      {postId === post.id && (
        <PostModal
          isVisible={modal}
          setIsVisible={setModal}
          post={post}
          like={like}
          isLiked={isLiked}
          likeHandler={likeHandler}
          refetch={refetch}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 0.3,
    marginVertical: 4,
    backgroundColor: 'rgb(200, 200, 200)'
  }
})

export default PostWrapper
