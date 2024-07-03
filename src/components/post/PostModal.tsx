import { Alert, FlatList, Keyboard, RefreshControl, ScrollView, Share, StyleSheet, View } from 'react-native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Feather, Ionicons, MaterialCommunityIcons } from '../../lib/icon/icons.ts'
import { PostResponse } from '../../module/post/types/response'
import { createComment, getCommentsByPostId } from '../../module/comment/api.ts'
import { toElapsedTime } from '../../lib/util/datetime.ts'
import { useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { CreateCommentRequest } from '../../module/comment/types/request'
import { CommentResponse } from '../../module/comment/types/response'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import Line from '../common/Line.tsx'
import ImageModal from './ImageModal.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import Text from '../common/Text.tsx'
import { AnimatedView } from '../common/Animated.tsx'
import Modal, { ModalStates } from '../common/Modal.tsx'
import LoadableImage, { SkeletonImage } from '../common/LoadableImage.tsx'
import CommentWithReply from '../comment/CommentWithReply.tsx'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import { deletePostById } from '../../module/post/api.ts'
import useOptimisticUpdatePost from '../../module/post/hooks/useOptimisticUpdatePost.ts'
import { CommentStates } from '../../module/post/hooks/useComment.ts'
import { LikeStates } from '../../module/post/hooks/useLike.ts'
import useInput from '../../lib/hooks/useInput.ts'
import useForm from '../../lib/hooks/useForm.ts'
import TextInput from '../common/TextInput.tsx'
import { createSkeletonArray } from '../../lib/util/skeleton.ts'
import { SkeletonCommentItem } from '../comment/CommentItem.tsx'
import useStackEffect from '../../lib/hooks/useStackEffect.ts'

type Props = {
  post: PostResponse
  likeStates: LikeStates
  commentStates: CommentStates
} & ModalStates

const PostModal = ({ isVisible, setIsVisible, post, likeStates, commentStates }: Props) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const route = useRoute<RouteProp<NavigatorParamList>>()
  const { setIsNavigated } = useStackEffect(() => {
    setIsVisible(true)
  })
  const student = useSelector((store: Store) => store.student)
  const contentStates = useInput('content', {
    canEmpty: false,
    maxLength: 280
  })
  const { value: content, setValue: setContent, ref: contentRef } = contentStates
  const { resetHandler, isSubmittable } = useForm(contentStates)
  const { isLiked, count: likeCount, likeHandler } = likeStates
  const { count: commentCount, setHandler: setCommentsHandler, addHandler: addCommentHandler } = commentStates
  const [selectedComment, setSelectedComment] = useState<CommentResponse>()
  const [isCommentCreated, setIsCommentCreated] = useState(false)
  const [modal, setModal] = useState(false)
  const [index, setIndex] = useState(0)
  const [refreshing] = useState(false)
  const listRef = useRef<FlatList>(null)
  const {
    data: comments = [],
    refetch,
    isLoading
  } = useQuery(['getCommentsByPostId', post.id], () => getCommentsByPostId(post.id), {
    onSuccess: comments =>
      setCommentsHandler(comments.filter(comment => !comment.deletedDate).map(comment => comment.id).length),
    refetchOnWindowFocus: 'always',
    enabled: isVisible
  })
  const { mutate: submitComment } = useMutation((request: CreateCommentRequest) => createComment(request), {
    onSuccess: response => {
      if (!response.commentId) setIsCommentCreated(true)
      Keyboard.dismiss()
      resetHandler()
      setSelectedComment(undefined)
      addCommentHandler()
      queryClient.setQueryData<CommentResponse[]>(['getMyComments'], data => [...(data ?? []), response])
    },
    onSettled: () => {
      refetch()
    }
  })
  const { mutate: removePost } = useOptimisticUpdatePost(
    (id: string) => deletePostById(id),
    posts => posts?.filter(_post => _post.id !== post.id) ?? [],
    {
      onMutate: () => setIsVisible(false),
      onSuccess: () => {
        route.name === 'myComment' && queryClient.invalidateQueries(['getMyComments'])
        Alert.alert('게시글이 삭제되었습니다.')
      }
    }
  )

  const deletePostHandler = useCallback(async () => {
    Alert.alert(
      '게시글을 삭제하시겠습니까?',
      undefined,
      [
        {
          text: '취소'
        },
        {
          text: '삭제',
          onPress: () => removePost(post.id),
          style: 'destructive'
        }
      ],
      { cancelable: false }
    )
  }, [post.id])

  const userIndex = useMemo(() => {
    let index = 1

    return Object.fromEntries(
      Array.from(new Set(comments.map(comment => comment.writer.id))).map(id =>
        post?.writer.id === id ? [id, 0] : [id, index++]
      )
    )
  }, [post, comments])

  useEffect(() => {
    navigation.addListener('blur', () => setIsVisible(false))
  }, [])

  return (
    <Modal
      style={{ justifyContent: 'flex-end' }}
      containerStyle={styles.container}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      swipeDirection="down"
      propagateSwipe
      useSafeArea
      onModalWillShow={refetch}
      onSwipeComplete={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      onModalHide={() => {
        resetHandler()
        setSelectedComment(undefined)
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 40
        }}>
        <View style={styles.bar} />
      </View>
      <FlatList
        ref={listRef}
        data={isLoading ? createSkeletonArray(4) : comments.filter(comment => !comment.commentId)}
        contentContainerStyle={isLoading && { gap: 8 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
        renderItem={({ item }) =>
          isLoading ? (
            <SkeletonCommentItem />
          ) : (
            <View onStartShouldSetResponder={() => true}>
              <CommentWithReply
                comments={comments}
                comment={item}
                commentStates={commentStates}
                userIndex={userIndex}
                selectedComment={selectedComment}
                setSelectedComment={setSelectedComment}
              />
              <Line />
            </View>
          )
        }
        keyExtractor={item => (isLoading ? item : item.id)}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        onContentSizeChange={(width, height) => {
          isCommentCreated && listRef.current!.scrollToOffset({ offset: height })
          setIsCommentCreated(false)
        }}
        ListHeaderComponent={
          <View onStartShouldSetResponder={() => true}>
            <View style={styles.post}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <View style={styles.profile}>
                  <Ionicons name="person-circle-sharp" size={38} color="rgb(200, 200, 200)" />
                  <View style={{ gap: 2 }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 12
                      }}>
                      두유
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 10,
                        color: 'grey'
                      }}>
                      {post.writer.major} {post.writer.grade}학년
                    </Text>
                  </View>
                </View>
                {student.id === post.writer.id && (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 20
                    }}>
                    <TouchableScale
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate('postUpdate', { post })
                        setIsNavigated(true)
                      }}>
                      <MaterialCommunityIcons name="square-edit-outline" size={22} />
                    </TouchableScale>
                    <TouchableScale activeOpacity={0.8} onPress={deletePostHandler}>
                      <Ionicons name="trash-outline" size={22} />
                    </TouchableScale>
                  </View>
                )}
              </View>
              <GestureHandlerRootView>
                <TapGestureHandler numberOfTaps={2} onActivated={likeHandler}>
                  <View style={styles.body}>
                    {post.images.length > 0 && (
                      <ScrollView
                        style={styles.images}
                        contentContainerStyle={{ gap: 10 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {post.images.map((uri, index) => (
                          <TouchableScale
                            style={styles.image}
                            containerStyle={{ flex: 1 }}
                            activeScale={0.98}
                            activeOpacity={0.8}
                            key={uri}
                            onPress={() => {
                              setIndex(index)
                              setModal(true)
                            }}
                            onLongPress={() => Share.share({ message: uri })}>
                            <LoadableImage
                              style={{ borderRadius: 5 }}
                              source={{ uri }}
                              fadeDuration={300}
                              skeleton={<SkeletonImage />}
                            />
                          </TouchableScale>
                        ))}
                      </ScrollView>
                    )}
                    <View
                      style={{
                        gap: 4
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold'
                        }}>
                        {post.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'normal',
                          lineHeight: 20
                        }}>
                        {post.content}
                      </Text>
                    </View>
                  </View>
                </TapGestureHandler>
              </GestureHandlerRootView>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4
                    }}>
                    <TouchableScale activeOpacity={0.8} onPress={likeHandler}>
                      <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={25} color="red" />
                    </TouchableScale>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: 'red'
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
                    <TouchableScale activeOpacity={0.8} onPress={() => contentRef.current?.focus()}>
                      <Ionicons name="chatbubble-outline" size={23} color="rgb(140, 180, 255)" />
                    </TouchableScale>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'rgb(140, 180, 255)',
                        fontWeight: 'bold'
                      }}>
                      {commentCount}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 10,
                    color: 'grey',
                    fontWeight: 'light'
                  }}>
                  {toElapsedTime(post.createdDate)}
                </Text>
              </View>
            </View>
            <Line />
          </View>
        }
      />
      {selectedComment && (
        <AnimatedView style={styles.selectedMessage} entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
          <Text
            style={{
              fontSize: 12,
              color: 'white',
              fontWeight: 'normal'
            }}>
            {userIndex[selectedComment.writer.id] === 0
              ? '내 댓글에 남기는 답글'
              : `두유${userIndex[selectedComment.writer.id]}님의 댓글에 남기는 답글`}
          </Text>
          <TouchableScale activeOpacity={0.8} onPress={() => setSelectedComment(undefined)}>
            <Ionicons name="close-outline" size={18} color="white" />
          </TouchableScale>
        </AnimatedView>
      )}
      <View
        style={{
          justifyContent: 'center',
          height: 68,
          borderTopWidth: 0.25,
          borderColor: 'rgb(200, 200, 200)',
          paddingHorizontal: 12,
          paddingVertical: 2
        }}>
        <View style={styles.input}>
          <TextInput
            inputStates={contentStates}
            style={{
              flex: 1,
              fontSize: 13,
              fontWeight: 'normal'
            }}
            placeholder="댓글을 입력해주세요."
            maxLength={contentStates.options?.maxLength}
            multiline
            onChangeText={text => setContent(text.replace(/\n+/g, '\n'))}
            onSubmitEditing={() => submitComment({ postId: post.id, commentId: selectedComment?.id, content })}
          />
          <TapGestureHandler
            enabled={isSubmittable}
            onBegan={() =>
              submitComment({
                postId: post.id,
                commentId: selectedComment?.id,
                content
              })
            }>
            <Feather name="send" size={22} color={isSubmittable ? 'black' : 'grey'} />
          </TapGestureHandler>
        </View>
      </View>
      {post.images && <ImageModal isVisible={modal} setIsVisible={setModal} images={post.images} index={index} />}
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  container: {
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  bar: {
    width: 40,
    height: 5,
    borderRadius: 16,
    backgroundColor: 'rgb(220, 220, 220)'
  },
  post: {
    gap: 4,
    padding: 15
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  body: {
    gap: 8,
    marginVertical: 7
  },
  images: {
    height: 120,
    marginBottom: 10
  },
  image: {
    flex: 1,
    width: 120,
    height: '100%'
  },
  selectedMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(150, 200, 150)',
    zIndex: 99
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 42,
    maxHeight: 140,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 20,
    borderRadius: 16,
    borderWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)',
    backgroundColor: 'white',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  }
})

export default PostModal
