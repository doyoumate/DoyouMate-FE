import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '../lib/icon.ts'
import { toElapsedTime } from '../lib/date.ts'
import { PostResponse } from '../module/post/dto/response'

interface Props {
  post: PostResponse
  like: number
  isLiked: boolean
  likeHandler: () => Promise<void>
}

const PostItem = ({ post, like, isLiked, likeHandler }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Ionicons name="person-circle-sharp" size={36} color="rgb(160, 160, 160)" />
        <View style={{ gap: 2 }}>
          <Text
            style={{
              fontFamily: 'NanumSquare_acB',
              fontSize: 13
            }}>
            두유
          </Text>
          <Text
            style={{
              fontFamily: 'NanumSquare_acR',
              fontSize: 10,
              color: 'grey'
            }}>
            컴퓨터공학부 2학년
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text
          style={{
            fontFamily: 'NanumSquare_acB',
            fontSize: 13
          }}
          numberOfLines={1}>
          {post.title}
        </Text>
        <Text
          style={{
            fontFamily: 'NanumSquare_acR',
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
            <TouchableOpacity activeOpacity={0.8} onPress={likeHandler}>
              <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20} color="red" />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'NanumSquare_acB',
                fontSize: 12,
                color: 'red'
              }}>
              {like}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4
            }}>
            <Ionicons name="chatbubble-outline" size={20} color="rgb(140, 180, 255)" />
            <Text
              style={{
                fontFamily: 'NanumSquare_acB',
                fontSize: 12,
                color: 'rgb(140, 180, 255)'
              }}>
              {post.commentIds.length}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 6,
            fontFamily: 'NanumSquare_acL',
            fontSize: 10,
            color: 'grey'
          }}>
          {toElapsedTime(post.createdDate)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: -4
  },
  body: {
    gap: 5,
    marginVertical: 7
  }
})

export default PostItem
