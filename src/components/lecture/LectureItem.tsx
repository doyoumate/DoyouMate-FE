import { LectureResponse } from '../../module/lecture/types/response'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Ionicons } from '../../lib/icon/icons.ts'
import Text from '../common/Text.tsx'
import ContentLoader, { Rect } from 'react-content-loader/native'

interface Props {
  lecture: LectureResponse
  containerStyle?: StyleProp<ViewStyle>
}

const LectureItem = ({ lecture, containerStyle }: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        style={{
          fontSize: 11,
          color: 'rgb(50, 50, 50)',
          fontWeight: 'light'
        }}>
        {lecture.year} {'>'} {lecture.semester}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold'
        }}>
        {lecture.name}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'normal'
        }}>
        {lecture.major}
      </Text>
      {lecture.professorName && (
        <View style={styles.professor}>
          <Ionicons name="person-outline" size={11} />
          <Text
            style={{
              fontSize: 11,
              fontWeight: 'normal'
            }}>
            {lecture.professorName}
          </Text>
        </View>
      )}
      {lecture.date && (
        <View style={styles.date}>
          <Ionicons name="time-outline" size={11} />
          <Text
            style={{
              fontSize: 11,
              fontWeight: 'normal'
            }}>
            {lecture.date.replaceAll(',', ', ')}
          </Text>
        </View>
      )}
    </View>
  )
}

const SkeletonLectureItem = () => {
  return (
    <ContentLoader speed={0.5} width="100%" height={120} backgroundColor="#ededed" foregroundColor="#e1e1e1">
      <Rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
    </ContentLoader>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOpacity: 0.2,
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

export { SkeletonLectureItem }
export default LectureItem
