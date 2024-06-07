import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorParamList } from './navigation'
import StackNavigator from './StackNavigator.tsx'
import AuthNavigator from './AuthNavigator.tsx'
import SplashScreen from '../screens/SplashScreen.tsx'
import useAuthentication from '../module/auth/hooks/useAuthentication.ts'

const Tab = createBottomTabNavigator<NavigatorParamList>()

const RootNavigator = () => {
  const { isLoading, isLogin } = useAuthentication()

  if (isLoading) return <SplashScreen />

  return (
    <Tab.Navigator
      tabBar={() => <></>}
      screenOptions={{ headerShown: false }}
      initialRouteName={isLogin ? 'stack' : 'auth'}>
      <Tab.Screen name="auth" component={AuthNavigator} />
      <Tab.Screen name="stack" component={StackNavigator} />
    </Tab.Navigator>
  )
}

export default RootNavigator
