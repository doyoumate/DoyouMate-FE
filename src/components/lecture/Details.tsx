import { LayoutAnimation, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { createSkeletonArray } from '../../lib/util/skeleton.ts'
import { Entypo, FontAwesome5, SimpleLineIcons } from '../../lib/icon/icons.ts'
import Text from '../common/Text.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import Button from '../common/Button.tsx'
import { ReactNode, useMemo, useState } from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { useQuery } from 'react-query'
import { getProfessorById } from '../../module/professor/api.ts'
import { getAppliedStudentsByLectureId, getPreAppliedStudentsByLectureId } from '../../module/student/api.ts'
import { LectureResponse } from '../../module/lecture/types/response'
import RelatedLecturesModal from './RelatedLecturesModal.tsx'

interface Props {
  lecture: LectureResponse
}

const now = new Date()

const formatRange = (array: number[]) => {
  const sortedArr = [...array].sort((a, b) => a - b)
  const isConsecutive = sortedArr.every((num, i, array) => i === 0 || num === array[i - 1] + 1)

  if (isConsecutive) {
    const end = sortedArr[sortedArr.length - 1]
    return end === 6 ? `${sortedArr[0]}~` : `${sortedArr[0]}~${end}`
  } else {
    return sortedArr.join(', ')
  }
}

const LectureDetails = ({ lecture }: Props) => {
  const [modal, setModal] = useState(false)
  const [showProfessor, setShowProfessor] = useState(false)
  const { data: professor, isLoading: isProfessorLoading } = useQuery(
    ['getProfessorById', lecture.professorId],
    () => getProfessorById(lecture.professorId),
    {
      staleTime: 2.16e7,
      cacheTime: 2.16e7,
      enabled: lecture.professorId !== ''
    }
  )
  const { data: appliedStudents = [], isLoading: isAppliedStudentsLoading } = useQuery(
    ['getAppliedStudentsByLectureId', lecture.id],
    () => getAppliedStudentsByLectureId(lecture.id),
    {
      staleTime: 3.6e6,
      cacheTime: 3.6e6
    }
  )
  const { data: preAppliedStudents = [], isLoading: isPreAppliedStudentsLoading } = useQuery(
    ['getPreAppliedStudentsByLectureId', lecture.id],
    // () => getPreAppliedStudentsByLectureId(lecture.id),
    () => [],
    {
      staleTime: 1e7,
      cacheTime: 1e7
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.banners}>
        {isAppliedStudentsLoading || isPreAppliedStudentsLoading ? (
          createSkeletonArray(2).map(index => <SkeletonBanner key={index} />)
        ) : (
          <>
            <Banner
              icon={<FontAwesome5 name="user-graduate" size={30} color="rgb(40, 40, 40)" />}
              title={appliedStudents.length === 0 ? '수강생이 없는 강의' : `${appliedStudents.length}명이 신청한 강의`}
              description={
                appliedStudents.length === 0
                  ? '수강신청 기간이 아니거나 아무도 신청하지 않은 강의예요.'
                  : lecture.major.includes('교양') || (Number(otherMajorRate) === 0 && Number(otherGradeRate) === 0)
                  ? gpa === 0
                    ? '수강생들이 모두 새내기인 강의예요.'
                    : `수강생들의 평균 학점이 ${gpa}점인 강의예요.`
                  : gpa === 0
                  ? `타과생이나 타학년 학생이 없는 강의예요.`
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
          </>
        )}
      </View>
      <View style={styles.informations}>
        {isProfessorLoading ? (
          <SkeletonInformation />
        ) : (
          professor &&
          professor.name !== '미지정' && (
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 4,
                  paddingHorizontal: 13
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8
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
                {professor.email && professor.score && (
                  <TouchableScale
                    onPress={() => {
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                      setShowProfessor(current => !current)
                    }}>
                    <SimpleLineIcons name={showProfessor ? 'arrow-up' : 'arrow-down'} size={10} />
                  </TouchableScale>
                )}
              </View>
              <Information name="이름" value={professor.name} />
              {showProfessor && (
                <>
                  <Information
                    name="이메일"
                    value={professor.email}
                    onPress={() => Linking.openURL(`mailto:${professor.email}`)}
                  />
                  {professor.score && <Information name="평균 강의 평가" value={`${professor.score.toFixed(1)}점`} />}
                </>
              )}
            </View>
          )
        )}
        {lecture.note && (
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
                paddingHorizontal: 13
              }}>
              <FontAwesome5 name="check" size={14} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold'
                }}>
                공지사항
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12
              }}>
              <Text
                style={{
                  fontSize: 13
                }}>
                {lecture.note}
              </Text>
            </View>
          </View>
        )}
        <Information name="학점" value={lecture.credit} />
        <Information name="강의실" value={lecture.room.replaceAll(',', ', ')} />
        <Information name="시간" value={lecture.date.replaceAll(',', ', ')} />
        {lecture.limitStudentCount !== 0 && <Information name="최대 수강 인원" value={lecture.limitStudentCount} />}
        {lecture.limitStudentGrade.length !== 0 && (
          <Information name="수강 제한 학년" value={formatRange(lecture.limitStudentGrade)} />
        )}
        <Information name="이론 및 실습 비율" value={`${lecture.ratio.theory}:${lecture.ratio.practice}`} />
      </View>
      <View style={styles.buttons}>
        {now.getFullYear() === lecture.year && (
          <View style={{ flexDirection: 'row' }}>
            <Button text="관련된 강의" onPress={() => setModal(true)} />
          </View>
        )}
      </View>
      {now.getFullYear() === lecture.year && (
        <RelatedLecturesModal id={lecture.id} isVisible={modal} setIsVisible={setModal} />
      )}
    </View>
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
        ...(isRed && { backgroundColor: 'rgb(255, 200, 200)' })
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

const SkeletonBanner = () => {
  return (
    <ContentLoader speed={0.5} width="100%" height="70" backgroundColor="#ebebeb" foregroundColor="#e1e1e1">
      <Rect x="0" y="0" rx="15" ry="15" width="100%" height="100%" />
    </ContentLoader>
  )
}

const SkeletonInformation = () => {
  return (
    <ContentLoader speed={0.5} width="100%" height="100" backgroundColor="#ebebeb" foregroundColor="#e1e1e1">
      <Rect x="0" y="0" rx="15" ry="15" width="100%" height="100%" />
    </ContentLoader>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12
  },
  name: {
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 12
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    paddingHorizontal: 12
  },
  banners: {
    marginBottom: 12,
    gap: 8
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: 'rgb(235, 235, 255)',
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
    gap: 16
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  buttons: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 18,
    paddingHorizontal: 5
  }
})

export default LectureDetails
