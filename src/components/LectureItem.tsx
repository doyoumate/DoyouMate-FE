import { LectureResponse } from '../module/lecture/dto/response'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome5, Ionicons } from '../lib/icon.ts'

interface Props {
  lecture: LectureResponse
}

const LectureItem = ({ lecture }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 11,
          color: 'rgb(50, 50, 50)',
          fontFamily: 'NanumSquare_acL'
        }}>
        {lecture.year} {'>'} {lecture.semester}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'NanumSquare_acB'
        }}>
        {lecture.name}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'NanumSquare_acR'
        }}>
        {lecture.major}
      </Text>
      {lecture.professor && (
        <View style={styles.professor}>
          <FontAwesome5 name="user" size={11} />
          <Text
            style={{
              fontSize: 11,
              fontFamily: 'NanumSquare_acR'
            }}>
            {lecture.professor}
          </Text>
        </View>
      )}
      {lecture.date && (
        <View style={styles.date}>
          <Ionicons name="time-outline" size={11} />
          <Text
            style={{
              fontSize: 11,
              fontFamily: 'NanumSquare_acR'
            }}>
            {lecture.date}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
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
  professor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 10,
    marginBottom: 2,
    color: 'rgb(50, 50, 50)'
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    color: 'rgb(50, 50, 50)'
  }
})

export default LectureItem
