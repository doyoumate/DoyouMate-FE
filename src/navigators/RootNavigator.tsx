import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LectureScreen from '../screens/LectureScreen.tsx'
import { Ionicons } from '../lib/icon.ts'

const Tab = createBottomTabNavigator()

const LectureIcon = ({ color }: { color: string }) => (
  <Ionicons name="search" size={22} color={color} />
)

const RootNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="lecture"
        component={LectureScreen}
        options={{
          title: '강의',
          tabBarIcon: LectureIcon
        }}
      />
    </Tab.Navigator>
  )
}

export default RootNavigator
