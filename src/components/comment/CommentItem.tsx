import { Alert, LayoutAnimation, StyleSheet, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '../../lib/icon/icons.ts'
import { toElapsedTime } from '../../lib/util/datetime.ts'
import { CommentResponse } from '../../module/comment/types/response'
import { useSelector } from 'react-redux'
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { deleteCommentById } from '../../module/comment/api.ts'
import { FadeIn, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { AnimatedView } from '../common/Animated.tsx'
import Text from '../common/Text.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { CommentStates } from '../../module/post/hooks/useComment.ts'

interface Props {
  comment: CommentResponse
  commentStates: CommentStates
  userIndex: { [key: string]: number }
  selectedComment?: CommentResponse
  setSelectedComment?: Dispatch<SetStateAction<CommentResponse | undefined>>
  isReply?: boolean
}

const CommentItem = ({
  comment,
  commentStates,
  userIndex,
  selectedComment,
  setSelectedComment,
  isReply = false
}: Props) => {
  const queryClient = useQueryClient()
  const student = useSelector((store: Store) => store.student)
  const isSelected = useMemo(() => selectedComment?.id === comment.id, [selectedComment])
  const { setHandler: setCommentsHandler } = commentStates
  const { mutate: deleteComment } = useMutation((id: string) => deleteCommentById(id), {
    onMutate: async id => {
      const previousComments =
        queryClient.getQueryData<CommentResponse[]>(['getCommentsByPostId', comment.postId]) ?? []
      const previousMyComments = queryClient.getQueryData<CommentResponse[]>(['getMyComments']) ?? []

      await Promise.all([
        queryClient.cancelQueries(['getCommentsByPostId', comment.postId]),
        queryClient.cancelQueries(['getMyComments'])
      ])

      const newComments = previousComments
        .filter(comment => !(comment.id === id && comment.commentId))
        .map(comment => {
          if (comment.id === id)
            return {
              ...comment,
              content: '삭제된 댓글입니다.',
              deletedDate: new Date().toISOString()
            }
          else return comment
        })
      const newMyComments = previousMyComments.filter(comment => comment.id !== id)

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      queryClient.setQueryData(['getCommentsByPostId', comment.postId], newComments)
      queryClient.setQueryData(['getMyComments'], newMyComments)
      setCommentsHandler(newComments.length)

      return { previousComments, previousMyComments }
    },
    onError: (error, id, context) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      queryClient.setQueryData(['getCommentsByPostId', comment.postId], context!!.previousComments)
      queryClient.setQueryData(['getMyComments'], context!!.previousMyComments)
      setCommentsHandler(context!!.previousComments.length)
    },
    onSettled: () => queryClient.invalidateQueries(['getCommentsByPostId', comment.postId])
  })

  const removeCommentHandler = useCallback(async () => {
    Alert.alert(
      '댓글을 삭제하시겠습니까?',
      undefined,
      [
        {
          text: '취소'
        },
        {
          text: '삭제',
          onPress: () => deleteComment(comment.id),
          style: 'destructive'
        }
      ],
      { cancelable: false }
    )
  }, [comment.id])

  const selectedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(isSelected ? 'rgb(235, 250, 255)' : 'white', {
        duration: 300
      })
    }),
    [isSelected]
  )

  const canReply = useMemo(() => setSelectedComment && !isReply, [])

  return (
    <TouchableScale
      activeScale={0.99}
      onPress={() => selectedComment?.id === comment.id && setSelectedComment!!(undefined)}
      onLongPress={() => setSelectedComment!!(comment)}
      disabled={!canReply}>
      <AnimatedView
        entering={FadeIn.duration(500)}
        style={[
          { flexDirection: 'row' },
          isReply && {
            marginVertical: 4,
            paddingHorizontal: 8
          }
        ]}>
        {isReply && (
          <View
            style={{
              paddingTop: 8,
              paddingRight: 6
            }}>
            <MaterialCommunityIcons name="arrow-right-bottom" size={18} color="rgb(120, 120, 120)" />
          </View>
        )}
        <AnimatedView style={[styles.container, canReply && selectedStyle, isReply && styles.reply]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <View style={styles.profile}>
              <Ionicons name="person-circle-sharp" size={20} color="rgb(180, 180, 180)" />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 'bold'
                  }}>
                  {`두유${userIndex[comment.writer.id] === 0 ? '' : userIndex[comment.writer.id]}`}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: 'grey',
                    fontWeight: 'normal'
                  }}>
                  {userIndex[comment.writer.id] === 0
                    ? '작성자'
                    : `${comment.writer.major} ${comment.writer.grade}학년`}
                </Text>
              </View>
            </View>
            {!comment.deletedDate && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12
                }}>
                {!isReply && setSelectedComment && (
                  <TouchableScale
                    activeOpacity={0.9}
                    onPress={() => (isSelected ? setSelectedComment(undefined) : setSelectedComment(comment))}>
                    <Ionicons name="arrow-redo-outline" size={15} />
                  </TouchableScale>
                )}
                {student.id === comment.writer.id && (
                  <TouchableScale activeScale={0.9} activeOpacity={0.8} onPress={removeCommentHandler}>
                    <Ionicons name="trash-outline" size={15} />
                  </TouchableScale>
                )}
              </View>
            )}
          </View>
          <View style={styles.body}>
            <Text
              style={{
                fontSize: 11.5,
                lineHeight: 18,
                fontWeight: 'normal',
                ...(comment.deletedDate && { color: 'grey' })
              }}>
              {comment.content}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 10,
              color: 'grey',
              fontWeight: 'light'
            }}>
            {toElapsedTime(comment.createdDate)}
          </Text>
        </AnimatedView>
      </AnimatedView>
    </TouchableScale>
  )
}

const SkeletonCommentItem = () => {
  return (
    <ContentLoader speed={0.5} width="100%" height={100} backgroundColor="#ededed" foregroundColor="#e1e1e1">
      <Rect x="2%" y="0" rx="8" ry="8" width="96%" height="100%" />
    </ContentLoader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  reply: {
    backgroundColor: 'rgb(250, 250, 250)',
    borderRadius: 12
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  body: { marginVertical: 5 }
})

export type { Props }
export { SkeletonCommentItem }
export default CommentItem
