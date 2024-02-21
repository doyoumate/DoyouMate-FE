import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigators/RootNavigator.tsx'

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export default App
