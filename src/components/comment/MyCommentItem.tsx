import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FadeIn } from 'react-native-reanimated'
import PostModal from '../post/PostModal.tsx'
import CommentItem from './CommentItem.tsx'
import { CommentResponse } from '../../module/comment/types/response'
import { useQuery } from 'react-query'
import { getPostById } from '../../module/post/api.ts'
import { PostResponse } from '../../module/post/types/response'
import Line from '../common/Line.tsx'
import { AnimatedView } from '../common/Animated.tsx'
import useLike from '../../module/post/hooks/useLike.ts'
import useComment from '../../module/post/hooks/useComment.ts'

interface Props {
  comment: CommentResponse
  userIndex: { [key: string]: number }
}

const MyCommentItem = ({ comment, userIndex }: Props) => {
  const { data: post } = useQuery(['getPostById', comment.postId], () => getPostById(comment.postId))

  return <>{post && <CommentWrapper comment={comment} userIndex={userIndex} post={post} />}</>
}

const CommentWrapper = ({ comment, post, userIndex }: Props & { post: PostResponse }) => {
  const [modal, setModal] = useState(false)
  const likeStates = useLike(post)
  const commentStates = useComment(post)

  return (
    <>
      <AnimatedView entering={FadeIn.duration(500)}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setModal(true)}>
          <CommentItem comment={comment} commentStates={commentStates} userIndex={userIndex} />
          <Line />
        </TouchableOpacity>
      </AnimatedView>
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

export default MyCommentItem
