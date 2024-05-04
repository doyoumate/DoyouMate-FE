import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '../lib/icon.ts'
import { toElapsedTime } from '../lib/date.ts'
import { CommentResponse } from '../module/comment/dto/response'

interface Props {
  comment: CommentResponse
  userNames: { [key: string]: number }
}

const CommentItem = ({ comment, userNames }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Ionicons name="person-circle-sharp" size={32} color="rgb(160, 160, 160)" />
        <View style={{ gap: 2 }}>
          <Text
            style={{
              fontFamily: 'NanumSquare_acB',
              fontSize: 12
            }}>
            두유{userNames[comment.writer.id]}
          </Text>
          <Text
            style={{
              fontFamily: 'NanumSquare_acR',
              fontSize: 9,
              color: 'grey'
            }}>
            {comment.writer.major} {comment.writer.grade}학년
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text
          style={{
            fontFamily: 'NanumSquare_acR',
            fontSize: 12,
            lineHeight: 18
          }}>
          {comment.content}
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontFamily: 'NanumSquare_acL',
            fontSize: 10,
            color: 'grey'
          }}>
          {toElapsedTime(comment.createdDate)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 14
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  body: {
    marginVertical: 7
  }
})

export default CommentItem
