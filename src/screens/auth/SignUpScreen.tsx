import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useCallback, useMemo, useState } from 'react'
import { SendCertificationRequest, SignUpRequest } from '../../module/auth/dto/request'
import { certificate, signUp } from '../../module/auth/api.ts'
import Animated, { Easing, FadeInUp, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { AntDesign, Feather, Ionicons } from '../../lib/icon.ts'
import WarningMessage from '../../components/WarningMessage.tsx'
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/reducers/alertReducer.tsx'
import { isAxiosError } from 'axios'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList } from '../../navigators/navigation'

interface Props {
  navigation: StackNavigationProp<NavigatorParamList, 'signUp'>
}

const SignUpScreen = ({ navigation }: Props) => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [isMasking, setIsMasking] = useState(true)
  const [isSend, setIsSend] = useState(false)

  const dispatch = useDispatch()

  const canCertificate = useMemo(
    () =>
      id.trim().length === 10 && !isNaN(Number(id)) && phoneNumber.trim().length === 11 && !isNaN(Number(phoneNumber)),
    [id, phoneNumber]
  )

  const canSignUp = useMemo(
    () => isSend && password.trim().length >= 8 && code.trim().length === 6 && !isNaN(Number(code)),
    [isSend, password, code]
  )

  const canCertificateStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(canCertificate && !isSend ? 'rgb(250, 250, 250)' : 'rgb(230, 230, 230)', {
        duration: 500
      }),
      opacity: withTiming(canCertificate && !isSend ? 1 : 0.6, { duration: 500 })
    }),
    [canCertificate, isSend]
  )

  const canSignUpStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(canSignUp ? 'rgb(180, 200, 255)' : 'rgb(230, 230, 230)', {
      duration: 500
    }),
    shadowColor: withTiming(canSignUp ? 'rgb(180, 200, 255)' : 'rgb(230, 230, 230)', {
      duration: 500
    })
  }))

  const certificateHandler = useCallback(
    async (request: SendCertificationRequest) => {
      try {
        await certificate(request)
        dispatch(openModal('성공적으로 인증번호를 전송했습니다.'))
        setIsSend(true)
      } catch (error) {
        if (isAxiosError(error)) dispatch(openModal(error.response!.data.message))
      }
    },
    [dispatch]
  )

  const signUpHandler = useCallback(
    async (request: SignUpRequest) => {
      try {
        await signUp(request)
        dispatch(openModal('회원가입이 정상적으로 완료되었습니다.'))
        navigation.goBack()
      } catch (error) {
        if (isAxiosError(error)) dispatch(openModal(error.response!.data.message))
      }
    },
    [dispatch, navigation]
  )

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            fontFamily: 'NanumSquare_acEB',
            fontSize: 32
          }}>
          회원가입
        </Text>
        <Text
          style={{
            color: 'rgb(100, 100, 100)',
            fontFamily: 'NanumSquare_acL',
            fontSize: 16,
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
            style={[
              {
                flex: 1,
                fontFamily: 'NanumSquare_acR',
                fontSize: 13
              },
              isSend && { color: 'grey' }
            ]}
            value={id}
            placeholder="학번"
            placeholderTextColor="grey"
            maxLength={10}
            editable={!isSend}
            onChangeText={text => setId(text)}
          />
        </View>
        {id.length > 0 && (id.trim().length !== 10 || isNaN(Number(id))) && (
          <WarningMessage message="학번은 10자리 숫자이어야 합니다." />
        )}
      </View>
      <View style={{ gap: 8 }}>
        <View style={styles.input}>
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
            secureTextEntry={isMasking}
            maxLength={12}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIsMasking(current => !current)}>
            <Ionicons name={isMasking ? 'eye-off' : 'eye'} size={16} color="grey" />
          </TouchableOpacity>
        </View>
        {password.length > 0 && password.trim().length < 8 && (
          <WarningMessage message="패스워드는 8글자 이상이어야 합니다." />
        )}
      </View>
      <View style={{ gap: 8 }}>
        <View style={styles.input}>
          <AntDesign name="phone" size={15} color="grey" />
          <TextInput
            style={[
              {
                flex: 1,
                fontFamily: 'NanumSquare_acR',
                fontSize: 13
              },
              isSend && { color: 'grey' }
            ]}
            value={phoneNumber}
            placeholder="전화번호"
            placeholderTextColor="grey"
            textContentType="telephoneNumber"
            maxLength={11}
            editable={!isSend}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!canCertificate || isSend}
            onPress={() => certificateHandler({ studentNumber: id, to: phoneNumber })}>
            <Animated.View style={[styles.certificate, canCertificateStyle]}>
              <Feather name={isSend ? 'check' : 'send'} size={13} color={canCertificate ? 'black' : 'grey'} />
              <Text
                style={{
                  fontFamily: 'NanumSquare_acB',
                  fontSize: 11,
                  color: canCertificate ? 'black' : 'grey'
                }}>
                {isSend ? '전송 완료' : '인증번호 받기'}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
        {phoneNumber.length > 0 && (phoneNumber.trim().length !== 11 || isNaN(Number(phoneNumber))) && (
          <WarningMessage message="전화번호는 11자리 숫자이어야 합니다." />
        )}
      </View>
      {isSend && (
        <Animated.View style={{ gap: 8 }} entering={FadeInUp.duration(1000).easing(Easing.out(Easing.quad))}>
          <View style={styles.input}>
            <Ionicons name="barcode-outline" size={13} color="grey" />
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'NanumSquare_acR',
                fontSize: 13
              }}
              value={code}
              placeholder="인증번호"
              textContentType="oneTimeCode"
              maxLength={6}
              onChangeText={text => setCode(text)}
            />
          </View>
          {code.length > 0 && (code.trim().length !== 6 || isNaN(Number(code))) && (
            <WarningMessage message="인증번호는 6자리 숫자이어야 합니다." />
          )}
        </Animated.View>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!canSignUp}
        onPress={() => signUpHandler({ certification: { studentNumber: id, code }, password })}>
        <Animated.View style={[styles.signUp, canSignUpStyle]}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'NanumSquare_acB',
              fontSize: 16
            }}>
            가입
          </Text>
        </Animated.View>
      </TouchableOpacity>
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
