import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Ionicons, MaterialIcons } from '../../lib/icon/icons.ts'
import MenuItem from '../../components/student/MenuItem.tsx'
import image1 from '../../../assets/images/suya.jpg'
import { NavigatorParamList } from '../../navigators/navigation'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { FadeIn } from 'react-native-reanimated'
import Line from '../../components/common/Line.tsx'
import { AnimatedView } from '../../components/common/Animated.tsx'
import Text from '../../components/common/Text.tsx'
import LoadableImage, { SkeletonImage } from '../../components/common/LoadableImage.tsx'

interface Props {
  navigation: BottomTabNavigationProp<NavigatorParamList, 'studentInfo'>
}

const StudentInfoScreen = ({ navigation }: Props) => {
  const student = useSelector((store: Store) => store.student)

  const logoutHandler = useCallback(async () => {
    await AsyncStorage.clear()
    navigation.navigate('auth')
    Alert.alert('정상적으로 로그아웃 되었습니다.')
  }, [])

  return (
    <AnimatedView style={{ flex: 1 }} entering={FadeIn.duration(300)}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgb(250, 250, 250)'
        }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.profile}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16
                }}>
                <View style={styles.image}>
                  <LoadableImage
                    source={image1}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 12
                    }}
                    fadeDuration={300}
                    skeleton={<SkeletonImage />}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ gap: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: 'extra'
                      }}>
                      {student.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: 'normal'
                      }}>
                      님
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'normal',
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
                    fontWeight: 'light'
                  }}>
                  전공
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal'
                  }}>
                  {student.major}
                </Text>
              </View>
              <View style={styles.info}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'light'
                  }}>
                  평균 학점
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal'
                    }}>
                    {student.gpa}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
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
                    fontWeight: 'light'
                  }}>
                  지난 학기 석차
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal'
                  }}>
                  {student.rank ? `${student.rank}등` : '정보 없음'}
                </Text>
              </View>
              <View style={styles.info}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'light'
                  }}>
                  상태
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal'
                  }}>
                  {student.status.split('(')[0]}
                </Text>
              </View>
            </View>
            <Line />
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
            <Line />
            <View style={styles.menus}>
              <Text style={styles.menuTitle}>게시글</Text>
              <MenuItem
                name="작성한 게시글"
                icon={<Ionicons name="pencil-outline" size={22} />}
                onPressHandler={() => navigation.navigate('myPost')}
              />
              <MenuItem
                name="작성한 댓글"
                icon={<Ionicons name="chatbubble-outline" size={22} />}
                onPressHandler={() => navigation.navigate('myComment')}
              />
              <MenuItem
                name="좋아요한 게시글"
                icon={<Ionicons name="heart-outline" size={22} />}
                onPressHandler={() => navigation.navigate('myLikedPost')}
              />
            </View>
            <Line />
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
    </AnimatedView>
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
    backgroundColor: 'white',
    borderRadius: 12,
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
    backgroundColor: 'rgb(240, 240, 240)'
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
  menuTitle: {
    marginBottom: 10,
    color: 'rgb(140, 140, 140)',
    fontSize: 13,
    fontWeight: 'bold'
  }
})

export default StudentInfoScreen
