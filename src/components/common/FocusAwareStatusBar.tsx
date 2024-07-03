import { StatusBar, StatusBarProps } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const FocusAwareStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused()

  return isFocused ? <StatusBar barStyle="dark-content" backgroundColor="rgb(250, 250, 250)" {...props} /> : <></>
}

export default FocusAwareStatusBar
