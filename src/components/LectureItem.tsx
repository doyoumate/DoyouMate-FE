import { Lecture } from '../module/lecture/lecture'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome5, Ionicons } from '../lib/icon.ts'

interface Props {
  lecture: Lecture
}

const LectureItem = ({ lecture }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.year}>
        {lecture.year} {'>'} {lecture.semester}
      </Text>
      <Text style={styles.name}>{lecture.name}</Text>
      <Text style={styles.major}>{lecture.major}</Text>
      {lecture.professor && (
        <View style={styles.professorContainer}>
          <FontAwesome5 name="user" />
          <Text style={styles.professor}>{lecture.professor}</Text>
        </View>
      )}
      {lecture.date && (
        <View style={styles.dateContainer}>
          <Ionicons name="time-outline" />
          <Text style={styles.date}>{lecture.date}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 3,
    width: '100%',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'rgb(250, 250, 250)',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0.3,
      height: 0.3
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  },
  year: {
    fontSize: 12,
    color: 'rgb(50, 50, 50)'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  major: { fontSize: 12 },
  professorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 10,
    marginBottom: 2,
    color: 'rgb(50, 50, 50)'
  },
  professor: {
    fontSize: 12
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    color: 'rgb(50, 50, 50)'
  },
  date: {
    fontSize: 12
  }
})

export default LectureItem
