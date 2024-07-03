import { createStackNavigator } from '@react-navigation/stack'
import { NavigatorParamList } from './navigation'
import LoginScreen from '../screens/auth/LoginScreen.tsx'
import SignUpScreen from '../screens/auth/SignUpScreen.tsx'

const Stack = createStackNavigator<NavigatorParamList>()

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerLeftContainerStyle: { left: 10 },
        headerStyle: { backgroundColor: 'rgb(250, 250, 250)' },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: 'rgb(50, 50, 50)',
        headerTitle: undefined,
        cardStyle: { backgroundColor: 'rgb(250, 250, 250)' }
      }}>
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signUp" component={SignUpScreen} options={{ headerTitle: '' }} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
