import { Alert, StyleSheet, View } from 'react-native'
import { useCallback, useMemo, useState } from 'react'
import { certificate, signUp } from '../../module/auth/api.ts'
import { Easing, FadeInUp, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { AntDesign, Feather, Ionicons } from '../../lib/icon/icons.ts'
import WarningMessage from '../../components/common/WarningMessage.tsx'
import { NavigatorParamList } from '../../navigators/navigation'
import { NavigationProp } from '@react-navigation/native'
import Text from '../../components/common/Text.tsx'
import { AnimatedView } from '../../components/common/Animated.tsx'
import useInput from '../../lib/hooks/useInput.ts'
import useForm from '../../lib/hooks/useForm.ts'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../../redux/reducers/loadingReducer.ts'
import TextInput from '../../components/common/TextInput.tsx'
import TouchableScale from '../../components/common/TouchableScale.tsx'

interface Props {
  navigation: NavigationProp<NavigatorParamList, 'signUp'>
}

const SignUpScreen = ({ navigation }: Props) => {
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
  const phoneNumberStates = useInput('phoneNumber', {
    isNumber: true,
    length: 11,
    trim: true,
    validate: value => /^(010{1})[0-9]{3,4}[0-9]{4}$/.test(value)
  })
  const codeStates = useInput('code', {
    isNumber: true,
    length: 6,
    trim: true
  })
  const { value: studentNumber, validity: studentNumberValidity } = studentNumberStates
  const { value: password, validity: passwordValidity, ref: passwordRef } = passwordStates
  const { value: phoneNumber, validity: phoneNumberValidity, ref: phoneNumberRef } = phoneNumberStates
  const { value: code, validity: codeValidity, ref: codeRef } = codeStates
  const { isSubmittable } = useForm(studentNumberStates, passwordStates, phoneNumberStates, codeStates)
  const [isSent, setIsSent] = useState(false)
  const dispatch = useDispatch()

  const canCertificate = useMemo(
    () => !isSent && studentNumberValidity && phoneNumberValidity,
    [isSent, studentNumberValidity, phoneNumberValidity]
  )

  const activatedCertificateStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(canCertificate ? 'rgb(250, 250, 250)' : 'rgb(230, 230, 230)', { duration: 500 }),
      opacity: withTiming(canCertificate ? 1 : 0.6, { duration: 500 })
    }),
    [canCertificate]
  )

  const activatedSignUpStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(isSubmittable ? 'rgb(180, 200, 255)' : 'rgb(230, 230, 230)', { duration: 500 }),
      shadowColor: withTiming(isSubmittable ? 'rgb(180, 200, 255)' : 'rgb(230, 230, 230)', { duration: 500 })
    }),
    [isSubmittable]
  )

  const certificateHandler = useCallback(async () => {
    try {
      dispatch(setIsLoading(true))
      await certificate({ studentNumber, to: phoneNumber })
      Alert.alert('성공적으로 인증번호를 전송했습니다.')
      setIsSent(true)
      codeRef.current?.focus()
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [studentNumber, phoneNumber])

  const signUpHandler = useCallback(async () => {
    try {
      dispatch(setIsLoading(true))
      await signUp({ studentNumber, code, password })
      Alert.alert('회원가입이 정상적으로 완료되었습니다.')
      navigation.goBack()
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [studentNumber, code, password])

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'extra'
          }}>
          회원가입
        </Text>
        <Text
          style={{
            color: 'rgb(100, 100, 100)',
            fontSize: 16,
            fontWeight: 'light',
            lineHeight: 20,
            letterSpacing: 0.1
          }}>
          18학번 이상의 삼육대학교 학생이라면{'\n'}
          누구나 두유메이트를 이용할 수 있어요.
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        <View style={styles.input}>
          <AntDesign name="idcard" size={16} color="grey" />
          <TextInput
            inputStates={studentNumberStates}
            style={{
              flex: 1,
              fontWeight: 'normal',
              fontSize: 13,
              ...(isSent && { color: 'grey' })
            }}
            placeholder="학번"
            textContentType="username"
            keyboardType="numeric"
            maxLength={studentNumberStates.options?.maxLength}
            editable={!isSent}
            onSubmitEditing={passwordRef.current?.focus}
          />
        </View>
        {studentNumber.length > 0 && !studentNumberValidity && (
          <WarningMessage message="학번은 10자리 숫자이어야 합니다." />
        )}
      </View>
      <View style={{ gap: 8 }}>
        <View style={styles.input}>
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
            textContentType="password"
            maxLength={passwordStates.options?.maxLength}
            onSubmitEditing={phoneNumberRef.current?.focus}
          />
          <TouchableScale activeOpacity={0.8} onPress={() => passwordStates.setIsMasked(current => !current)}>
            <Ionicons name={passwordStates.isMasked ? 'eye-off' : 'eye'} size={16} color="grey" />
          </TouchableScale>
        </View>
        {password.length > 0 && !passwordValidity && <WarningMessage message="패스워드는 8글자 이상이어야 합니다." />}
      </View>
      <View style={{ gap: 8 }}>
        <View style={styles.input}>
          <AntDesign name="phone" size={15} color="grey" />
          <TextInput
            inputStates={phoneNumberStates}
            style={{
              flex: 1,
              fontWeight: 'normal',
              fontSize: 13,
              ...(isSent && { color: 'grey' })
            }}
            placeholder="전화번호"
            textContentType="telephoneNumber"
            keyboardType="numeric"
            maxLength={phoneNumberStates.options?.maxLength}
            editable={!isSent}
          />
          <TouchableScale activeOpacity={0.8} disabled={!canCertificate} onPress={certificateHandler}>
            <AnimatedView style={[styles.certificate, activatedCertificateStyle]}>
              <Feather name={isSent ? 'check' : 'send'} size={13} color={canCertificate ? 'black' : 'grey'} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 11,
                  color: canCertificate ? 'black' : 'grey'
                }}>
                {isSent ? '전송 완료' : '인증번호 받기'}
              </Text>
            </AnimatedView>
          </TouchableScale>
        </View>
        {phoneNumber.length > 0 && !phoneNumberValidity && (
          <WarningMessage message="전화번호는 11자리 숫자이어야 합니다." />
        )}
      </View>
      {isSent && (
        <AnimatedView style={{ gap: 8 }} entering={FadeInUp.duration(1000).easing(Easing.out(Easing.quad))}>
          <View style={styles.input}>
            <Ionicons name="barcode-outline" size={13} color="grey" />
            <TextInput
              inputStates={codeStates}
              style={{
                flex: 1,
                fontWeight: 'normal',
                fontSize: 13
              }}
              placeholder="인증번호"
              textContentType="oneTimeCode"
              keyboardType="numeric"
              maxLength={codeStates.options?.maxLength}
            />
          </View>
          {code.length > 0 && !codeValidity && <WarningMessage message="인증번호는 6자리 숫자이어야 합니다." />}
        </AnimatedView>
      )}
      <TouchableScale activeScale={0.98} activeOpacity={0.8} disabled={!isSubmittable} onPress={() => signUpHandler()}>
        <AnimatedView style={[styles.signUp, activatedSignUpStyle]}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16
            }}>
            가입
          </Text>
        </AnimatedView>
      </TouchableScale>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 18
  },
  title: {
    alignItems: 'flex-start',
    gap: 6,
    marginVertical: 40
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    backgroundColor: 'rgb(250, 250, 250)',
    borderBottomWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)'
  },
  certificate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  },
  signUp: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: 42,
    marginTop: 12,
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

export default SignUpScreen
