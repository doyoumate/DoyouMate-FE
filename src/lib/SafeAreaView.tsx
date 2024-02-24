import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { SafeAreaView as ReactSafeAreaView } from 'react-native-safe-area-context'
import { ViewProps } from 'react-native'

const SafeAreaView = (props: ViewProps) => {
  const height = useBottomTabBarHeight()

  return (
    <ReactSafeAreaView
      {...props}
      style={[props.style, { paddingBottom: height, height: '100%' }]}>
      {props.children}
    </ReactSafeAreaView>
  )
}

export default SafeAreaView
