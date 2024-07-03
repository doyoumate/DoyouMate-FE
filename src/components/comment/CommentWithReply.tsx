import { View } from 'react-native'
import type { Props as CommentItemProps } from './CommentItem.tsx'
import CommentItem from './CommentItem.tsx'
import { CommentResponse } from '../../module/comment/types/response'

type Props = {
  comments: CommentResponse[]
  comment: CommentResponse
} & Omit<CommentItemProps, 'isReply'>

const CommentWithReply = ({ comments, ...props }: Props) => {
  return (
    <View>
      <CommentItem {...props} />
      {comments
        .filter(comment => !comment.deletedDate && comment.commentId === props.comment.id)
        .map(comment => (
          <CommentItem {...props} comment={comment} isReply key={comment.id} />
        ))}
    </View>
  )
}

export default CommentWithReply
