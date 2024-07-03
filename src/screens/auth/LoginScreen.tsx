import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigatorParamList } from '../../navigators/navigation'
import { AntDesign, Ionicons } from '../../lib/icon/icons.ts'
import { useCallback } from 'react'
import { login } from '../../module/auth/api.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FadeIn, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import WarningMessage from '../../components/common/WarningMessage.tsx'
import { useDispatch } from 'react-redux'
import { setStudent } from '../../redux/reducers/studentReducer.ts'
import { getStudent } from '../../module/student/api.ts'
import { NavigationProp } from '@react-navigation/native'
import { AnimatedView } from '../../components/common/Animated.tsx'
import Text from '../../components/common/Text.tsx'
import useInput from '../../lib/hooks/useInput.ts'
import TextInput from '../../components/common/TextInput.tsx'
import useForm from '../../lib/hooks/useForm.ts'
import TouchableScale from '../../components/common/TouchableScale.tsx'
import { setIsLoading } from '../../redux/reducers/loadingReducer.ts'

interface Props {
  navigation: NavigationProp<NavigatorParamList, 'login'>
}

const LoginScreen = ({ navigation }: Props) => {
  const studentNumberStates = useInput('studentNumber', {
    isNumber: true,
    length: 10,
    trim: true
  })
  const passwordStates = useInput('password', {
    minLength: 8,
    maxLength: 12,
    trim: true,
    isMasked: true
  })
  const { resetHandler, isSubmittable, focusedInput } = useForm(studentNumberStates, passwordStates)
  const { value: studentNumber, validity: studentNumberValidity } = studentNumberStates
  const { value: password, validity: passwordValidity, ref: passwordRef } = passwordStates
  const dispatch = useDispatch()

  const focusedStudentNumberStyle = useAnimatedStyle(
    () => ({
      shadowOpacity: withTiming(focusedInput === studentNumberStates.inputKey ? 0.2 : 0, {
        duration: 500
      })
    }),
    [focusedInput]
  )

  const focusedPasswordStyle = useAnimatedStyle(
    () => ({
      shadowOpacity: withTiming(focusedInput === passwordStates.inputKey ? 0.2 : 0, {
        duration: 500
      })
    }),
    [focusedInput]
  )

  const activatedLoginStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(isSubmittable ? 'rgb(180, 200, 255)' : 'rgb(230, 230, 230)', {
        duration: 500
      }),
      shadowColor: withTiming(isSubmittable ? 'rgb(180, 200, 255)' : 'rgb(230, 230, 230)', {
        duration: 500
      })
    }),
    [isSubmittable]
  )

  const loginHandler = useCallback(async () => {
    try {
      Keyboard.dismiss()
      dispatch(setIsLoading(true))
      const { accessToken, refreshToken } = await login({ studentNumber, password })

      await Promise.all([
        AsyncStorage.setItem('accessToken', accessToken),
        AsyncStorage.setItem('refreshToken', refreshToken)
      ])
      dispatch(setStudent(await getStudent()))
      navigation.navigate('stack')
      resetHandler()
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [studentNumber, passwordStates])

  return (
    <AnimatedView style={styles.container} entering={FadeIn.duration(300)}>
      <View style={styles.title}>
        <Text
          style={{
            color: 'rgb(115, 140, 255)',
            fontSize: 44,
            fontWeight: 'extra'
          }}>
          DoyouMate
        </Text>
        <Text
          style={{
            color: 'rgb(140, 140, 140)',
            fontSize: 16,
            fontWeight: 'light'
          }}>
          삼육대학교 학생의 편의를 위한 모바일 플랫폼
        </Text>
      </View>
      <View style={styles.inputs}>
        <View style={{ gap: 8 }}>
          <AnimatedView style={[styles.input, focusedStudentNumberStyle]}>
            <AntDesign name="idcard" size={16} color="grey" />
            <TextInput
              inputStates={studentNumberStates}
              style={{
                flex: 1,
                fontSize: 13,
                fontWeight: 'normal'
              }}
              maxLength={studentNumberStates.options?.maxLength}
              placeholder="학번"
              placeholderTextColor="grey"
              textContentType="username"
              keyboardType="numeric"
              onSubmitEditing={passwordRef.current?.focus}
            />
          </AnimatedView>
          {studentNumber.length > 0 && !studentNumberValidity && (
            <WarningMessage message="학번은 10자리 숫자이어야 합니다." />
          )}
        </View>
        <View style={{ gap: 8 }}>
          <AnimatedView style={[styles.input, focusedPasswordStyle]}>
            <Ionicons name="lock-closed-outline" size={15} color="grey" />
            <TextInput
              inputStates={passwordStates}
              style={{
                flex: 1,
                fontWeight: 'normal',
                fontSize: 13
              }}
              placeholder="패스워드"
              placeholderTextColor="grey"
              maxLength={passwordStates.options?.maxLength}
              onSubmitEditing={loginHandler}
            />
          </AnimatedView>
          {password.length > 0 && !passwordValidity && <WarningMessage message="패스워드는 8글자 이상이어야 합니다." />}
        </View>
      </View>
      <TouchableScale activeScale={0.98} activeOpacity={0.8} onPress={loginHandler} disabled={!isSubmittable}>
        <AnimatedView style={[styles.login, activatedLoginStyle]}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16
            }}>
            로그인
          </Text>
        </AnimatedView>
      </TouchableScale>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 5
        }}>
        <Text
          style={{
            color: 'grey',
            fontWeight: 'light',
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
              fontWeight: 'normal',
              fontSize: 13
            }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 18
  },
  title: {
    alignItems: 'center',
    gap: 10,
    marginVertical: 12
  },
  inputs: {
    gap: 14,
    marginTop: 30,
    marginBottom: 15
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    elevation: 2
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
