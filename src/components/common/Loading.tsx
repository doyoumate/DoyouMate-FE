import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { AnimatedView } from './Animated.tsx'

const Loading = () => {
  const isLoading = useSelector((store: Store) => store.loading.isLoading)

  if (!isLoading) return <></>

  return (
    <AnimatedView style={styles.container} entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          opacity: 0.4
        }}>
        <ActivityIndicator size="large" />
      </View>
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999
  }
})

export default Loading
