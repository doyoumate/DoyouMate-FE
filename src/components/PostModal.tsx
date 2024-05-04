import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import Modal from 'react-native-modal'
import CommentItem from './CommentItem.tsx'
import { Feather, Ionicons } from '../lib/icon.ts'
import { PostResponse } from '../module/post/dto/response'
import { CommentResponse } from '../module/comment/dto/response'
import { createComment, getCommentsByPostId } from '../module/comment/api.ts'
import { useAsyncEffect } from '../lib/hook.ts'

interface Props {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  post: PostResponse
  like: number
  isLiked: boolean
  likeHandler: () => Promise<void>
  refetch: () => Promise<unknown>
}

const PostModal = ({ isVisible, setIsVisible, post, like, isLiked, likeHandler, refetch }: Props) => {
  const [comments, setComments] = useState<CommentResponse[]>([])
  const [content, setContent] = useState('')

  const submitHandler = useCallback(
    async (content: string) => {
      await createComment({ postId: post.id, content })
      setContent('')
      setComments(await getCommentsByPostId(post.id))
      await refetch()
    },
    [post.id]
  )

  const userNames = useMemo(
    () =>
      Object.fromEntries(
        Array.from(new Set(comments.map(comment => comment.writer.id))).map((id, index) => [id, index + 1])
      ),
    [comments]
  )

  useAsyncEffect(async () => {
    setComments(await getCommentsByPostId(post.id))
  }, [post.id])

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      backdropOpacity={0.2}
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      propagateSwipe
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      onSwipeComplete={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 35
          }}>
          <View style={styles.bar} />
        </View>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View onStartShouldSetResponder={() => true}>
              <CommentItem comment={item} userNames={userNames} />
              <View style={styles.line} />
            </View>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View onStartShouldSetResponder={() => true}>
              <View style={styles.post}>
                <View style={styles.profile}>
                  <Ionicons name="person-circle-sharp" size={38} color="rgb(160, 160, 160)" />
                  <View style={{ gap: 2 }}>
                    <Text
                      style={{
                        fontFamily: 'NanumSquare_acB',
                        fontSize: 14
                      }}>
                      두유
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'NanumSquare_acR',
                        fontSize: 11,
                        color: 'grey'
                      }}>
                      {post.writer.major} {post.writer.grade}학년
                    </Text>
                  </View>
                </View>
                <View style={styles.body}>
                  <Text
                    style={{
                      fontFamily: 'NanumSquare_acB',
                      fontSize: 13.5
                    }}>
                    {post.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'NanumSquare_acR',
                      fontSize: 12.5,
                      lineHeight: 20
                    }}>
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
                      <TouchableOpacity activeOpacity={0.8} onPress={likeHandler}>
                        <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={25} color="red" />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontFamily: 'NanumSquare_acB',
                          fontSize: 14,
                          color: 'red'
                        }}>
                        {like}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6
                      }}>
                      <Ionicons name="chatbubble-outline" size={22} color="rgb(140, 180, 255)" />
                      <Text
                        style={{
                          fontFamily: 'NanumSquare_acB',
                          fontSize: 14,
                          color: 'rgb(140, 180, 255)'
                        }}>
                        {comments.length}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.line} />
            </View>
          }
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 2
          }}>
          <View style={styles.input}>
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'NanumSquare_acR',
                fontSize: 13
              }}
              value={content}
              placeholder="댓글을 입력해주세요."
              placeholderTextColor="grey"
              maxLength={280}
              multiline
              onChangeText={text => setContent(text)}
              onSubmitEditing={() => submitHandler(content)}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => submitHandler(content)}>
              <Feather name="send" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
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
    width: 35,
    height: 4,
    borderRadius: 16,
    backgroundColor: 'rgb(220, 220, 220)'
  },
  post: {
    gap: 5,
    padding: 15,
    paddingTop: 18
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  body: {
    gap: 5,
    marginVertical: 7
  },
  line: {
    height: 0.3,
    backgroundColor: 'rgb(200, 200, 200)'
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    minHeight: 42,
    maxHeight: 140,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 22,
    borderRadius: 16,
    borderWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)',
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
