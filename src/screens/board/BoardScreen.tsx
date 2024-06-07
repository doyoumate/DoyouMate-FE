import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { NavigatorParamList } from '../../navigators/navigation'
import BoardItem from '../../components/board/BoardItem.tsx'
import { useCallback, useEffect, useState } from 'react'
import SearchBar from '../../components/common/SearchBar.tsx'
import { useQuery } from 'react-query'
import { FadeIn } from 'react-native-reanimated'
import { Ionicons } from '../../lib/icon/icons.ts'
import { BoardResponse } from '../../module/board/types/response'
import { getBoards } from '../../module/board/api.ts'
import { NavigationProp } from '@react-navigation/native'
import PostList from '../../components/post/PostList.tsx'
import { AnimatedView } from '../../components/common/Animated.tsx'
import { searchPostPage } from '../../module/post/api.ts'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchRequest } from '../../redux/reducers/postReducer.ts'
import TouchableScale from '../../components/common/TouchableScale.tsx'

interface Props {
  navigation: NavigationProp<NavigatorParamList, 'board'>
}

const pageSize = 10

const BoardScreen = ({ navigation }: Props) => {
  const searchRequest = useSelector((store: Store) => store.post.searchRequest)
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const { data: boards = [] } = useQuery(['getBoards'], getBoards)

  const setBoardHandler = useCallback(
    (board: BoardResponse) => {
      console.log(searchRequest)
      const newRequest = { ...searchRequest }

      board.id === searchRequest.boardId ? delete newRequest.boardId : (newRequest.boardId = board.id)
      dispatch(setSearchRequest(newRequest))
    },
    [searchRequest]
  )

  useEffect(() => {
    dispatch(setSearchRequest({ ...searchRequest, content }))
  }, [content])

  return (
    <AnimatedView style={{ flex: 1 }} entering={FadeIn.duration(300)}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: 10
            }}>
            <SearchBar setText={setContent} placeholder={'게시물 내용을 입력해주세요.'} />
            <TouchableScale activeOpacity={0.8} onPress={() => navigation.navigate('postWrite')}>
              <Ionicons name="pencil-outline" size={22} />
            </TouchableScale>
          </View>
          <View style={styles.boards}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {boards.map(board => (
                <TouchableScale activeOpacity={0.8} key={board.id} onPress={() => setBoardHandler(board)}>
                  <BoardItem board={board} selected={board.id === searchRequest?.boardId} />
                </TouchableScale>
              ))}
            </ScrollView>
          </View>
          <PostList
            queryKey={['searchPostPage', searchRequest]}
            queryFn={pageParam => searchPostPage(searchRequest, pageSize, pageParam)}
            useRefresh
          />
        </View>
      </SafeAreaView>
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    paddingTop: 8
  },
  boards: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
    paddingHorizontal: 10
  }
})

export default BoardScreen
