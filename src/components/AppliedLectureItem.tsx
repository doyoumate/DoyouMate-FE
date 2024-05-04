import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LectureResponse } from '../module/lecture/dto/response'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList } from '../navigators/navigation'
import { FontAwesome5, Ionicons } from '../lib/icon.ts'

interface Props {
  lecture: LectureResponse
  navigation: StackNavigationProp<NavigatorParamList, 'appliedLecture'>
}

const AppliedLectureItem = ({ lecture, navigation }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('lectureInfo', { lecture })}>
      <Text
        style={{
          fontFamily: 'NanumSquare_acB',
          fontSize: 14
        }}>
        {lecture.name}
      </Text>
      {lecture.professor && (
        <View style={styles.professor}>
          <FontAwesome5 name="user" />
          <Text
            style={{
              fontFamily: 'NanumSquare_acR',
              fontSize: 12
            }}>
            {lecture.professor}
          </Text>
        </View>
      )}
      {lecture.date && (
        <View style={styles.date}>
          <Ionicons name="time-outline" />
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'NanumSquare_acR'
            }}>
            {lecture.date}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'rgb(250, 250, 250)',
    borderWidth: 0.2,
    borderColor: 'rgb(180, 180, 180)'
  },
  professor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    color: 'rgb(50, 50, 50)'
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    color: 'rgb(50, 50, 50)'
  }
})

export default AppliedLectureItem
