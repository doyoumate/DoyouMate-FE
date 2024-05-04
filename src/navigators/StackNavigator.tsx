import LectureInfoScreen from '../screens/lecture/LectureInfoScreen.tsx'
import AppliedLectureScreen from '../screens/lecture/AppliedLectureScreen.tsx'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigatorParamList } from './navigation'
import TabNavigator from './TabNavigator.tsx'
import MarkedLectureScreen from '../screens/lecture/MarkedLectureScreen.tsx'
import PostWriteScreen from '../screens/board/PostWriteScreen.tsx'

const Stack = createStackNavigator<NavigatorParamList>()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="tab"
      screenOptions={{
        headerLeftContainerStyle: { left: 10 },
        headerRightContainerStyle: { right: 12 },
        headerStyle: { backgroundColor: 'rgb(250, 250, 250)' },
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: 'NanumSquare_acB',
          fontWeight: undefined
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: 'rgb(50, 50, 50)',
        cardStyle: { backgroundColor: 'rgb(250, 250, 250)' }
      }}>
      <Stack.Screen name="tab" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="lectureInfo" component={LectureInfoScreen} options={{ headerTitle: '강의 정보' }} />
      <Stack.Screen name="appliedLecture" component={AppliedLectureScreen} options={{ headerTitle: '신청한 강의' }} />
      <Stack.Screen name="markedLecture" component={MarkedLectureScreen} options={{ headerTitle: '찜한 강의' }} />
      <Stack.Screen name="postWrite" component={PostWriteScreen} options={{ headerTitle: '게시글 작성' }} />
    </Stack.Navigator>
  )
}

export default StackNavigator
