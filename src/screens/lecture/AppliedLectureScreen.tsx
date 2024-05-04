import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList } from '../../navigators/navigation'
import { RouteProp } from '@react-navigation/native'
import { useState } from 'react'
import { LectureResponse } from '../../module/lecture/dto/response'
import { getLecturesByIds } from '../../module/lecture/api.ts'
import { useSelector } from 'react-redux'
import AppliedLectureItem from '../../components/AppliedLectureItem.tsx'
import { Ionicons } from '../../lib/icon.ts'
import { useAsyncEffect } from '../../lib/hook.ts'

interface Props {
  navigation: StackNavigationProp<NavigatorParamList, 'appliedLecture'>
  route: RouteProp<NavigatorParamList, 'appliedLecture'>
}

const AppliedLectureScreen = ({ navigation }: Props) => {
  const student = useSelector((store: Store) => store.student)
  const [lectures, setLectures] = useState<LectureResponse[]>([])
  const [type, setType] = useState('calender')

  useAsyncEffect(async () => {
    setLectures(await getLecturesByIds(student.appliedLectureIds))
  }, [student])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.types}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setType('calender')}>
            <View style={[styles.type, type === 'calender' && styles.activatedType]}>
              <Ionicons name="calendar-outline" size={12} color={type === 'calender' ? 'white' : 'black'} />
              <Text
                style={[
                  {
                    fontSize: 12,
                    marginRight: 1.5,
                    fontFamily: 'NanumSquare_acR'
                  },
                  type === 'calender' && {
                    color: 'white',
                    fontFamily: 'NanumSquare_acB'
                  }
                ]}>
                시간표
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setType('list')}>
            <View style={[styles.type, type === 'list' && styles.activatedType]}>
              <Ionicons name="list" size={12} color={type === 'list' ? 'white' : 'black'} />
              <Text
                style={[
                  {
                    fontSize: 12,
                    marginRight: 1.5,
                    fontFamily: 'NanumSquare_acR'
                  },
                  type === 'list' && {
                    color: 'white',
                    fontFamily: 'NanumSquare_acB'
                  }
                ]}>
                리스트
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 400
          }}>
          {type === 'calender' ? (
            <></>
          ) : (
            lectures.map(lecture => <AppliedLectureItem lecture={lecture} navigation={navigation} key={lecture.id} />)
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  types: {
    flexDirection: 'row',
    gap: 2,
    width: '100%',
    height: 32,
    marginBottom: 20
  },
  type: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginRight: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  },
  activatedType: {
    borderWidth: 0,
    backgroundColor: 'rgb(102,176,255)'
  }
})

export default AppliedLectureScreen
