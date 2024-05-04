import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '../lib/icon.ts'
import { PostResponse } from '../module/post/dto/response'

interface Props {
  post: PostResponse
  like: number
}

const PostSummaryItem = ({ post, like }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Ionicons name="person-circle-sharp" size={18} color="grey" />
        <Text
          style={{
            fontFamily: 'NanumSquare_acB',
            fontSize: 11
          }}>
          두유
        </Text>
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
            fontSize: 12
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
            fontFamily: 'NanumSquare_acR',
            fontSize: 11,
            color: 'rgb(140, 140, 140)'
          }}>
          {post.board.name} 게시판
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2
            }}>
            <Ionicons name="heart-outline" size={12} color="red" />
            <Text
              style={{
                fontFamily: 'NanumSquare_acR',
                fontSize: 10,
                color: 'red'
              }}>
              {like}
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
                fontFamily: 'NanumSquare_acR',
                fontSize: 10,
                color: 'rgb(140, 180, 255)'
              }}>
              {post.commentIds.length}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgb(250, 250, 250)',
    shadowColor: 'rgb(230, 230, 230)',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowRadius: 3,
    elevation: 3
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  body: {
    gap: 5,
    marginTop: 6,
    marginBottom: 9
  }
})

export default PostSummaryItem
