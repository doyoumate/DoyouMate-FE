import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList } from '../../navigators/navigation'
import BoardItem from '../../components/BoardItem.tsx'
import { useCallback, useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar.tsx'
import { useInfiniteQuery } from 'react-query'
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated'
import { Ionicons } from '../../lib/icon.ts'
import { searchPosts } from '../../module/post/api.ts'
import { BoardResponse } from '../../module/board/dto/response'
import { SearchPostsRequest } from '../../module/post/dto/request'
import { useAsyncEffect } from '../../lib/hook.ts'
import { getBoards } from '../../module/board/api.ts'
import PostWrapper from '../../components/PostWrapper.tsx'

interface Props {
  navigation: StackNavigationProp<NavigatorParamList, 'board'>
}

const pageSize = 30

const BoardScreen = ({ navigation }: Props) => {
  const [boards, setBoards] = useState<BoardResponse[]>([])
  const [request, setRequest] = useState<SearchPostsRequest>({ content: '' })
  const [content, setContent] = useState('')
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } = useInfiniteQuery(
    ['searchPosts', request],
    ({ pageParam = 0 }) => searchPosts(request, pageParam, pageSize),
    {
      getNextPageParam: (lastPage, allPages) => (lastPage.length === 0 ? null : allPages.length)
    }
  )

  const onEndReachedHandler = useCallback(async () => {
    if (hasNextPage && !isFetching) await fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const setBoardHandler = useCallback(
    (board: BoardResponse) => {
      if (board.id === request.boardId) {
        setRequest(current => {
          delete current.boardId

          return { ...current }
        })
      } else {
        setRequest(current => ({ ...current, boardId: board.id }))
      }
    },
    [request]
  )

  useAsyncEffect(async () => {
    setBoards(await getBoards())
    navigation.addListener('focus', () => refetch())
  }, [navigation, refetch])

  useEffect(() => {
    setRequest(current => ({ ...current, content }))
  }, [content])

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(1000).easing(Easing.out(Easing.quad))}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
            <SearchBar setContent={setContent} placeholder={'게시물 내용을 입력해주세요.'} />
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('postWrite', { boards })}>
              <Ionicons name="pencil-outline" size={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.boards}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ overflow: 'visible' }}>
              {boards.map(board => (
                <TouchableOpacity activeOpacity={0.8} key={board.id} onPress={() => setBoardHandler(board)}>
                  <BoardItem board={board} selected={board.id === request.boardId} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={data?.pages.flat()}
            renderItem={({ item, index: idx }) => (
              <PostWrapper
                post={item}
                refetch={() => refetch({ refetchPage: (lastPage, index) => index === Math.floor(idx / 30) })}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReachedHandler}
            onEndReachedThreshold={0.4}
            ListEmptyComponent={
              <Animated.View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 500
                }}
                entering={FadeIn.duration(500).easing(Easing.inOut(Easing.quad))}
                exiting={FadeOut.duration(500).easing(Easing.inOut(Easing.quad))}>
                <Text
                  style={{
                    fontFamily: 'NanumSquare_acR',
                    fontSize: 14
                  }}>
                  검색된 게시글이 없습니다.
                </Text>
              </Animated.View>
            }
          />
        </View>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 10
  },
  boards: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4
  }
})

export default BoardScreen
