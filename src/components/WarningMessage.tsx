import Animated, { Easing, FadeIn } from 'react-native-reanimated'
import { Ionicons } from '../lib/icon.ts'
import { StyleSheet, Text } from 'react-native'

interface Props {
  message: string
}

const WarningMessage = ({ message }: Props) => {
  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(500).easing(Easing.inOut(Easing.quad))}>
      <Ionicons name="warning-outline" size={11} color="red" />
      <Text
        style={{
          color: 'red',
          fontFamily: 'NanumSquare_acL',
          fontSize: 11
        }}>
        {message}
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: '100%',
    paddingHorizontal: 4
  }
})

export default WarningMessage
