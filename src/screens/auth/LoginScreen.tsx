import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList } from '../../navigators/navigation'
import { AntDesign, Ionicons } from '../../lib/icon.ts'
import { useCallback, useMemo, useState } from 'react'
import { login } from '../../module/auth/api.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginRequest } from '../../module/auth/dto/request'
import { isAxiosError } from 'axios'
import Animated, { Easing, FadeIn, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import WarningMessage from '../../components/WarningMessage.tsx'
import { useDispatch } from 'react-redux'
import { setStudent } from '../../redux/reducers/studentReducer.ts'
import { getStudent } from '../../module/student/api.ts'
import { openModal } from '../../redux/reducers/alertReducer.tsx'

interface Props {
  navigation: StackNavigationProp<NavigatorParamList, 'login'>
}

const LoginScreen = ({ navigation }: Props) => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState('')
  const dispatch = useDispatch()

  const canLogin = useMemo(() => id.length !== 10 || password.length < 8, [id, password])

  const idFocusedStyle = useAnimatedStyle(
    () => ({
      shadowOpacity: withTiming(focused === 'id' ? 0.2 : 0, {
        duration: 500
      })
    }),
    [focused]
  )

  const passwordFocusedStyle = useAnimatedStyle(
    () => ({
      shadowOpacity: withTiming(focused === 'password' ? 0.2 : 0, {
        duration: 500
      })
    }),
    [focused]
  )

  const canLoginStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(canLogin ? 'rgb(230, 230, 230)' : 'rgb(180, 200, 255)', {
        duration: 500
      }),
      shadowColor: withTiming(canLogin ? 'rgb(230, 230, 230)' : 'rgb(180, 200, 255)', {
        duration: 500
      })
    }),
    [canLogin]
  )

  const loginHandler = useCallback(
    async (request: LoginRequest) => {
      try {
        const { accessToken, refreshToken } = await login(request)

        await AsyncStorage.setItem('accessToken', accessToken)
        await AsyncStorage.setItem('refreshToken', refreshToken)
        dispatch(setStudent(await getStudent()))
        navigation.navigate('stack')
        setId('')
        setPassword('')
      } catch (error) {
        if (isAxiosError(error)) dispatch(openModal(error.response!.data.message))
      }
    },
    [dispatch, navigation]
  )

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(1000).easing(Easing.out(Easing.quad))}>
      <View style={styles.title}>
        <Text
          style={{
            color: 'rgb(115, 140, 255)',
            fontFamily: 'NanumSquare_acEB',
            fontSize: 42
          }}>
          DoyouMate
        </Text>
        <Text
          style={{
            color: 'rgb(140, 140, 140)',
            fontFamily: 'NanumSquare_acL',
            fontSize: 16
          }}>
          삼육대학교 학생의 편의를 위한 모바일 플랫폼
        </Text>
      </View>
      <View style={styles.inputs}>
        <View style={{ gap: 8 }}>
          <Animated.View style={[styles.input, idFocusedStyle]}>
            <AntDesign name="idcard" size={16} color="grey" />
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'NanumSquare_acR',
                fontSize: 13
              }}
              value={id}
              maxLength={10}
              placeholder="학번"
              placeholderTextColor="grey"
              onChangeText={text => setId(text)}
              onFocus={() => setFocused('id')}
              onBlur={() => setFocused('')}
            />
          </Animated.View>
          {id.length > 0 && (id.trim().length !== 10 || isNaN(Number(id))) && (
            <WarningMessage message="학번은 10자리 숫자이어야 합니다." />
          )}
        </View>
        <View style={{ gap: 8 }}>
          <Animated.View style={[styles.input, passwordFocusedStyle]}>
            <Ionicons name="lock-closed-outline" size={15} color="grey" />
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'NanumSquare_acR',
                fontSize: 13
              }}
              value={password}
              placeholder="패스워드"
              placeholderTextColor="grey"
              secureTextEntry
              maxLength={12}
              onChangeText={text => setPassword(text)}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused('')}
            />
          </Animated.View>
          {password.length > 0 && password.trim().length < 8 && (
            <WarningMessage message="패스워드는 8글자 이상이어야 합니다." />
          )}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => loginHandler({ studentNumber: id, password })}
        disabled={id.length !== 10 || password.length < 8}>
        <Animated.View style={[styles.login, canLoginStyle]}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'NanumSquare_acB',
              fontSize: 16
            }}>
            로그인
          </Text>
        </Animated.View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 5
        }}>
        <Text
          style={{
            color: 'grey',
            fontFamily: 'NanumSquare_acL',
            fontSize: 13
          }}>
          아직 계정이 없으시다면,
        </Text>
        <TouchableOpacity
          style={{
            paddingBottom: 0.4,
            borderBottomWidth: 0.2
          }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('signUp')}>
          <Text
            style={{
              color: 'grey',
              fontFamily: 'NanumSquare_acR',
              fontSize: 13
            }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    gap: 8,
    paddingHorizontal: 18
  },
  title: {
    alignItems: 'center',
    gap: 10,
    marginVertical: 12
  },
  inputs: {
    alignItems: 'center',
    gap: 14,
    width: '100%',
    marginTop: 30,
    marginBottom: 15
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    height: 42,
    paddingLeft: 12,
    paddingRight: 22,
    borderRadius: 10,
    backgroundColor: 'rgb(250, 250, 250)',
    borderWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)',
    shadowColor: 'rgb(140, 160, 250)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    height: 42,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgb(170, 200, 255)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  }
})

export default LoginScreen
