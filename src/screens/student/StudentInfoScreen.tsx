import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons, MaterialIcons } from '../../lib/icon.ts'
import MenuItem from '../../components/MenuItem.tsx'
import image1 from '../../../assets/images/suya.jpg'
import { NavigatorParamList } from '../../navigators/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { openModal } from '../../redux/reducers/alertReducer.tsx'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Animated, { Easing, FadeIn } from 'react-native-reanimated'

interface Props {
  navigation: BottomTabNavigationProp<NavigatorParamList, 'studentInfo'>
}

const StudentInfoScreen = ({ navigation }: Props) => {
  const student = useSelector((store: Store) => store.student)
  const dispatch = useDispatch()

  const logoutHandler = useCallback(async () => {
    await AsyncStorage.clear()
    navigation.navigate('auth')
    dispatch(openModal('정상적으로 로그아웃 되었습니다.'))
  }, [navigation, dispatch])

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(1000).easing(Easing.out(Easing.quad))}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgb(250, 250, 250)'
        }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.profile}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15
                }}>
                <View style={styles.image}>
                  <Image
                    source={image1}
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      borderRadius: 12
                    }}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ gap: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: 26,
                        fontFamily: 'NanumSquare_acEB'
                      }}>
                      {student.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 26,
                        fontFamily: 'NanumSquare_acR'
                      }}>
                      님
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'NanumSquare_acR',
                      color: 'rgb(120, 120, 120)'
                    }}>
                    {student.grade}학년 {student.semester}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.infos}>
              <View style={styles.info}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NanumSquare_acL'
                  }}>
                  전공
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NanumSquare_acR'
                  }}>
                  {student.major}
                </Text>
              </View>
              <View style={styles.info}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NanumSquare_acL'
                  }}>
                  평균 학점
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NanumSquare_acR'
                    }}>
                    {student.gpa}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NanumSquare_acR',
                      color: 'rgb(150, 150, 150)'
                    }}>
                    {' '}
                    / 4.5
                  </Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NanumSquare_acL'
                  }}>
                  지난 학기 석차
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NanumSquare_acR'
                  }}>
                  {student.rank ? `${student.rank}등` : '정보 없음'}
                </Text>
              </View>
              <View style={styles.info}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NanumSquare_acL'
                  }}>
                  상태
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NanumSquare_acR'
                  }}>
                  {student.status.split('(')[0]}
                </Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.menus}>
              <Text style={styles.menuTitle}>강의</Text>
              <MenuItem
                name="신청한 강의"
                icon={<MaterialIcons name="playlist-add-check" size={22} />}
                onPressHandler={() => navigation.navigate('appliedLecture')}
              />
              <MenuItem
                name="찜한 강의"
                icon={<Ionicons name="bookmark-outline" size={22} />}
                onPressHandler={() => navigation.navigate('markedLecture')}
              />
            </View>
            <View style={styles.line} />
            <View style={styles.menus}>
              <Text style={styles.menuTitle}>게시글</Text>
              <MenuItem name="작성한 게시글" icon={<Ionicons name="pencil-outline" size={22} />} />
              <MenuItem name="작성한 댓글" icon={<Ionicons name="chatbubble-outline" size={22} />} />
              <MenuItem name="좋아요한 게시글" icon={<Ionicons name="heart-outline" size={22} />} />
            </View>
            <View style={styles.line} />
            <View style={styles.menus}>
              <Text style={styles.menuTitle}>설정</Text>
              <MenuItem name="비밀번호 변경" icon={<Ionicons name="lock-closed-outline" size={22} />} />
              <MenuItem
                name="로그아웃"
                icon={<MaterialIcons name="logout" size={22} />}
                onPressHandler={logoutHandler}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  image: {
    width: 100,
    height: 100,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'rgb(220, 220, 220)'
  },
  profile: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: 'rgb(250, 250, 250)'
  },
  infos: {
    marginBottom: 12,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'rgb(240, 240, 240)',
    shadowColor: 'rgb(240, 240, 240)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
    paddingHorizontal: 15
  },
  menus: {
    paddingHorizontal: 12,
    paddingVertical: 20
  },
  line: {
    height: 0.3,
    marginVertical: 4,
    backgroundColor: 'rgb(200, 200, 200)'
  },
  menuTitle: {
    marginBottom: 10,
    color: 'rgb(140, 140, 140)',
    fontSize: 13,
    fontFamily: 'NanumSquare_acB'
  }
})

export default StudentInfoScreen
