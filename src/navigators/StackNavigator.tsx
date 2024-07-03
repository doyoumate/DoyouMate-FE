import LectureInfoScreen from '../screens/lecture/LectureInfoScreen.tsx'
import AppliedLectureScreen from '../screens/lecture/AppliedLectureScreen.tsx'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { NavigatorParamList } from './navigation'
import TabNavigator from './TabNavigator.tsx'
import MarkedLectureScreen from '../screens/lecture/MarkedLectureScreen.tsx'
import PostWriteScreen from '../screens/board/PostWriteScreen.tsx'
import MyPostScreen from '../screens/board/MyPostScreen.tsx'
import MyCommentScreen from '../screens/board/MyCommentScreen.tsx'
import MyLikedPostScreen from '../screens/board/MyLikedPostScreen.tsx'
import PostUpdateScreen from '../screens/board/PostUpdateScreen.tsx'
import { Dimensions } from 'react-native'

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
          fontFamily: 'NanumSqaure_acB'
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: 'rgb(50, 50, 50)',
        cardStyle: { backgroundColor: 'rgb(250, 250, 250)' },
        gestureEnabled: true,
        gestureResponseDistance: Dimensions.get('screen').width,
        gestureVelocityImpact: 0.5,
        ...TransitionPresets.SlideFromRightIOS
      }}>
      <Stack.Screen name="tab" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="lectureInfo" component={LectureInfoScreen} options={{ headerTitle: '강의 정보' }} />
      <Stack.Screen name="appliedLecture" component={AppliedLectureScreen} options={{ headerTitle: '신청한 강의' }} />
      <Stack.Screen name="markedLecture" component={MarkedLectureScreen} options={{ headerTitle: '찜한 강의' }} />
      <Stack.Screen name="postWrite" component={PostWriteScreen} options={{ headerTitle: '게시글 작성' }} />
      <Stack.Screen name="postUpdate" component={PostUpdateScreen} options={{ headerTitle: '게시글 수정' }} />
      <Stack.Screen name="myPost" component={MyPostScreen} options={{ headerTitle: '내 게시글' }} />
      <Stack.Screen name="myComment" component={MyCommentScreen} options={{ headerTitle: '내 댓글' }} />
      <Stack.Screen name="myLikedPost" component={MyLikedPostScreen} options={{ headerTitle: '좋아요한 게시글' }} />
    </Stack.Navigator>
  )
}

export default StackNavigator
