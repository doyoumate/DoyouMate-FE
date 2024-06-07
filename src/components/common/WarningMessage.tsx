import { FadeIn } from 'react-native-reanimated'
import { Ionicons } from '../../lib/icon/icons.ts'
import { StyleSheet } from 'react-native'
import { AnimatedView } from './Animated.tsx'
import Text from './Text.tsx'

interface Props {
  message: string
}

const WarningMessage = ({ message }: Props) => {
  return (
    <AnimatedView style={styles.container} entering={FadeIn.duration(500)}>
      <Ionicons name="warning-outline" size={11} color="red" />
      <Text
        style={{
          color: 'red',
          fontWeight: 'light',
          fontSize: 11
        }}>
        {message}
      </Text>
    </AnimatedView>
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
