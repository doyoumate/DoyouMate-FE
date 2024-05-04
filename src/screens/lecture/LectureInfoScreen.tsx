import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import { Ionicons } from '../../lib/icon.ts'
import { useEffect, useMemo, useState } from 'react'
import { getAppliedStudentsByLectureId, getPreAppliedStudentsByLectureId } from '../../module/student/api.ts'
import { StackNavigationProp } from '@react-navigation/stack'
import { StudentResponse } from '../../module/student/dto/response'
import LectureTagItem from '../../components/LectureTagItem.tsx'
import { useMark } from '../../module/lecture/hook.ts'
import { useSelector } from 'react-redux'

interface Props {
  navigation: StackNavigationProp<NavigatorParamList, 'lectureInfo'>
  route: RouteProp<NavigatorParamList, 'lectureInfo'>
}

const now = new Date()

const LectureInfoScreen = ({ navigation, route }: Props) => {
  const student = useSelector((store: Store) => store.student)
  const { lecture } = route.params
  const { isMarked, markHandler } = useMark(lecture)
  const [appliedStudents, setAppliedStudents] = useState<StudentResponse[]>([])
  const [preAppliedStudents, setPreAppliedStudents] = useState<StudentResponse[]>([])
  const gpa = useMemo(
    () =>
      (
        appliedStudents
          .map(student => student.gpa)
          .filter((gpa): gpa is number => gpa !== null)
          .reduce((sum, gpa) => sum + gpa, 0.0) /
        appliedStudents.map(student => student.gpa).filter((gpa): gpa is number => gpa !== null).length
      ).toFixed(1),
    [appliedStudents]
  )
  const otherMajorRate = useMemo(
    () =>
      (
        (appliedStudents.filter(student => student.major !== lecture.major).length / appliedStudents.length) *
        100
      ).toFixed(1),
    [appliedStudents, lecture.major]
  )
  const otherGradeRate = useMemo(
    () =>
      (
        (appliedStudents.filter(student => student.grade !== lecture.grade).length / appliedStudents.length) *
        100
      ).toFixed(1),
    [appliedStudents, lecture.grade]
  )

  useEffect(() => {
    Promise.all([getAppliedStudentsByLectureId(lecture.id), getPreAppliedStudentsByLectureId(lecture.id)]).then(
      ([appliedStudents, preAppliedStudents]) => {
        setAppliedStudents(appliedStudents)
        setPreAppliedStudents(preAppliedStudents)
      }
    )
  }, [lecture.id])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={markHandler} activeOpacity={0.8}>
          {isMarked ? <Ionicons name="bookmark" size={25} /> : <Ionicons name="bookmark-outline" size={25} />}
        </TouchableOpacity>
      )
    })
  }, [isMarked, markHandler, navigation])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'NanumSquare_acR',
              color: 'rgb(120, 120, 120)'
            }}>
            {lecture.year} {'>'} {lecture.semester}
          </Text>
        </View>
        <View style={styles.name}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'NanumSquare_acEB'
            }}>
            {lecture.name}
          </Text>
        </View>
        <View style={styles.tags}>
          {lecture.section && <LectureTagItem name={lecture.section} />}
          {now.getFullYear() === lecture.year && (
            <>
              <LectureTagItem name="장바구니에 담은 학생" value={`${preAppliedStudents.length}명`} />
              <LectureTagItem name="신청 학생" value={`${appliedStudents.length}명`} />
              {appliedStudents.length !== 0 && (
                <>
                  {!isNaN(Number(gpa)) && <LectureTagItem name="신청 학생들의 평균 학점" value={`${gpa}점`} />}
                  <LectureTagItem name="타과생 신청률" value={`${otherMajorRate}%`} />
                  <LectureTagItem name="타학년 신청률" value={`${otherGradeRate}%`} />
                </>
              )}
            </>
          )}
          {student.preAppliedLectureIds.includes(lecture.id) && <LectureTagItem name="내가 장바구니에 담은 강의" />}
          {student.appliedLectureIds.includes(lecture.id) && <LectureTagItem name="내가 수강신청한 강의" />}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12
  },
  name: {
    marginTop: 8,
    marginBottom: 12
  },
  date: {
    fontWeight: '300'
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap'
  }
})

export default LectureInfoScreen
