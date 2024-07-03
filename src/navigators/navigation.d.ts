import { LectureResponse } from '../module/lecture/types/response'
import { PostResponse } from '../module/post/types/response'

type RootNavigatorParamList = {
  auth: undefined
  stack: undefined
}

type AuthNavigatorParamList = {
  login: undefined
  signUp: undefined
}

type StackNavigatorParamList = {
  tab: undefined
  lectureInfo: { lecture: LectureResponse }
  appliedLecture: undefined
  preAppliedLecture: undefined
  markedLecture: undefined
  postWrite: undefined
  postUpdate: { post: PostResponse }
  myPost: undefined
  myComment: undefined
  myLikedPost: undefined
}

type TabNavigatorParamList = {
  home: undefined
  board: undefined
  lectureList: undefined
  studentInfo: undefined
}

type NavigatorParamList = RootNavigatorParamList &
  AuthNavigatorParamList &
  StackNavigatorParamList &
  TabNavigatorParamList

export type { NavigatorParamList }
