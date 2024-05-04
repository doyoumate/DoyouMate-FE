import { LectureResponse } from '../module/lecture/dto/response'
import { BoardResponse } from '../module/board/dto/response'

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
  markedLecture: undefined
  postWrite: { boards: BoardResponse[] }
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
