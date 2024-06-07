import { Linking, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import { Entypo, FontAwesome5, Ionicons } from '../../lib/icon/icons.ts'
import { ReactNode, useEffect, useMemo } from 'react'
import { getAppliedStudentsByLectureId, getPreAppliedStudentsByLectureId } from '../../module/student/api.ts'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import TagItem from '../../components/lecture/TagItem.tsx'
import Line from '../../components/common/Line.tsx'
import { getProfessorById } from '../../module/professor/api.ts'
import Text from '../../components/common/Text.tsx'
import useMark from '../../module/lecture/hooks/useMark.ts'

interface Props {
  navigation: NavigationProp<NavigatorParamList, 'lectureInfo'>
  route: RouteProp<NavigatorParamList, 'lectureInfo'>
}

const now = new Date()

const LectureInfoScreen = ({ navigation, route }: Props) => {
  const student = useSelector((store: Store) => store.student)
  const { lecture } = route.params
  const { isMarked, markHandler } = useMark(lecture)
  const { data: professor } = useQuery(['getProfessorById', lecture.professorId], () =>
    getProfessorById(lecture.professorId)
  )
  const { data: appliedStudents = [] } = useQuery(['getAppliedStudentsByLectureId', lecture.id], () =>
    getAppliedStudentsByLectureId(lecture.id)
  )
  const { data: preAppliedStudents = [] } = useQuery(['getPreAppliedStudentsByLectureId', lecture.id], () =>
    getPreAppliedStudentsByLectureId(lecture.id)
  )
  const gpa = useMemo(() => {
    const gpa = (
      appliedStudents
        .map(student => student.gpa)
        .filter((gpa): gpa is number => gpa !== null)
        .reduce((sum, gpa) => sum + gpa, 0.0) /
      appliedStudents.map(student => student.gpa).filter((gpa): gpa is number => gpa !== null).length
    ).toFixed(1)

    return isNaN(Number(gpa)) ? 0 : gpa
  }, [appliedStudents])
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                color: 'rgb(120, 120, 120)'
              }}>
              {lecture.year} {'>'} {lecture.semester}
            </Text>
          </View>
          <View style={styles.name}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'extra'
              }}>
              {lecture.name}
            </Text>
          </View>
          <View style={styles.tags}>
            {lecture.section && <TagItem name={lecture.section} />}
            {lecture.plan.type.split('/').map(type => (
              <TagItem name={type} key={type} />
            ))}
            <TagItem name={lecture.plan.evaluation} />
          </View>
          {now.getFullYear() === lecture.year && (
            <>
              {(appliedStudents.map(student => student.id).includes(student.id) ||
                preAppliedStudents.map(student => student.id).includes(student.id)) && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    marginTop: 10
                  }}>
                  <FontAwesome5 name="check" size={12} color="rgb(150, 200, 150)" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: 'rgb(120, 180, 120)'
                    }}>
                    {appliedStudents.map(student => student.id).includes(student.id)
                      ? '내가 신청한 강의'
                      : '내가 장바구니에 담은 강의'}
                  </Text>
                </View>
              )}
              <View style={styles.banners}>
                <Banner
                  icon={<FontAwesome5 name="user-graduate" size={30} color="rgb(40, 40, 40)" />}
                  title={
                    appliedStudents.length === 0 ? '수강생이 없는 강의' : `${appliedStudents.length}명이 신청한 강의`
                  }
                  description={
                    appliedStudents.length === 0
                      ? '수강신청 기간이 아니거나 아무도 신청하지 않은 강의예요.'
                      : lecture.major.includes('교양')
                      ? `수강생들의 평균 학점이 ${gpa}점인 강의예요.`
                      : Number(otherMajorRate) === 0 && Number(otherGradeRate) === 0
                      ? `수강생들의 평균 학점은 ${gpa}점이며, 타과생이나 타학년 학생이 없는 강의예요.`
                      : `수강생들의 평균 학점은 ${gpa}점이며 타과생 ${otherMajorRate}%, 타학년 ${otherGradeRate}%의 비율을 가진 강의예요.`
                  }
                  isRed={appliedStudents.length === 0}
                />
                <Banner
                  icon={<Entypo name="bucket" size={30} color="rgb(40, 40, 40)" />}
                  title={
                    preAppliedStudents.length === 0
                      ? '어떤 장바구니에도 담기지 않은 강의'
                      : `${preAppliedStudents.length}명이 장바구니에 담은 강의`
                  }
                  description={
                    preAppliedStudents.length === 0
                      ? '장바구니 신청 기간이 아니거나 아무도 장바구니에 담지 않은 강의예요.'
                      : undefined
                  }
                  isRed={preAppliedStudents.length === 0}
                />
              </View>
            </>
          )}
          <Line />
          <View style={styles.informations}>
            {professor && professor.name !== '미지정' && (
              <View
                style={[
                  styles.informations,
                  {
                    paddingVertical: 15,
                    borderRadius: 12,
                    backgroundColor: 'rgb(242, 242, 242)'
                  }
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    marginBottom: 4,
                    paddingHorizontal: 13
                  }}>
                  <FontAwesome5 name="chalkboard-teacher" size={14} />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold'
                    }}>
                    교수
                  </Text>
                </View>
                <Information name="이름" value={professor.name} />
                <Information name="직급" value={professor.role} />
                <Information
                  name="전화번호"
                  value={professor.phoneNumber
                    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                    .replace(/-{1,2}$/g, '')}
                  onPress={() => Linking.openURL(`sms:${professor.phoneNumber}`)}
                />
                <Information
                  name="이메일"
                  value={professor.email}
                  onPress={() => Linking.openURL(`mailto:${professor.email}`)}
                />
                {professor.score && <Information name="평균 강의평가" value={`${professor.score.toFixed(1)}점`} />}
              </View>
            )}
            <Information name="강의실" value={lecture.room.replaceAll(',', ', ')} />
            <Information name="시간" value={lecture.date.replaceAll(',', ', ')} />
            <Information
              name="이론 및 실습 비율"
              value={`${lecture.plan.ratio.theory}:${lecture.plan.ratio.practice}`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Banner = ({
  icon,
  title,
  description,
  isRed = false
}: {
  icon: ReactNode
  title: string
  description?: string
  isRed: boolean
}) => {
  return (
    <View
      style={{
        ...styles.banner,
        ...(isRed && { backgroundColor: 'rgb(255, 220, 220)' })
      }}>
      {icon}
      <View
        style={{
          flex: 1,
          gap: 3
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: 'rgb(40, 40, 40)'
          }}>
          {title}
        </Text>
        {description && (
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'normal',
              lineHeight: 15
            }}>
            {description}
          </Text>
        )}
      </View>
    </View>
  )
}

const Information = ({ name, value, onPress }: { name: string; value?: any; onPress?: () => void }) => {
  if (!value) return <></>

  return (
    <View style={styles.information}>
      <Text
        style={{
          flex: 1,
          fontSize: 13,
          fontWeight: 'normal'
        }}>
        {name}
      </Text>
      <TouchableOpacity style={{ flex: 2 }} activeOpacity={onPress ? 0.6 : 1} onPress={onPress}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'right'
          }}>
          {value}
        </Text>
      </TouchableOpacity>
    </View>
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
    gap: 6,
    flexWrap: 'wrap'
  },
  banners: {
    marginVertical: 10,
    gap: 8
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: 'rgb(245, 245, 255)',
    shadowColor: 'rgb(245, 245, 255)',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowRadius: 5,
    elevation: 5
  },
  informations: {
    gap: 16,
    marginVertical: 10
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  }
})

export default LectureInfoScreen
