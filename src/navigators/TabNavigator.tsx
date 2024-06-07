import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LectureListScreen from '../screens/lecture/LectureListScreen.tsx'
import { Ionicons } from '../lib/icon/icons.ts'
import { NavigatorParamList } from './navigation'
import StudentInfoScreen from '../screens/student/StudentInfoScreen.tsx'
import HomeScreen from '../screens/HomeScreen.tsx'
import BoardScreen from '../screens/board/BoardScreen.tsx'

const Tab = createBottomTabNavigator<NavigatorParamList>()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18
        },
        tabBarLabelStyle: { fontFamily: 'NanumSqaure_acB' },
        tabBarActiveTintColor: 'rgb(150, 150, 255)',
        tabBarInactiveTintColor: 'rgb(180, 180, 180)'
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="home" size={18} color={color} />
            ) : (
              <Ionicons name="home-outline" size={18} color={color} />
            )
        }}
      />
      <Tab.Screen
        name="board"
        component={BoardScreen}
        options={{
          title: '게시판',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="chatbox" size={18} color={color} />
            ) : (
              <Ionicons name="chatbox-outline" size={18} color={color} />
            )
        }}
      />
      <Tab.Screen
        name="lectureList"
        component={LectureListScreen}
        options={{
          title: '강의',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={18} color={color} />
        }}
      />
      <Tab.Screen
        name="studentInfo"
        component={StudentInfoScreen}
        options={{
          title: '내 정보',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="person" size={18} color={color} />
            ) : (
              <Ionicons name="person-outline" size={18} color={color} />
            )
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
