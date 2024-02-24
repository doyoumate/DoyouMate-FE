import { useCallback, useState } from 'react'
import { searchLectures } from '../module/lecture/api.ts'
import { SearchLecturesRequest } from '../module/lecture/lecture'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  ViewToken
} from 'react-native'
import LectureItem from '../components/LectureItem.tsx'
import Filter from '../components/Filter.tsx'
import SearchBar from '../components/SearchBar.tsx'
import Animated, { FadeIn, useSharedValue } from 'react-native-reanimated'
import { useInfiniteQuery } from 'react-query'
import SafeAreaView from '../lib/SafeAreaView.tsx'

const LectureScreen = () => {
  const [request, setRequest] = useState<SearchLecturesRequest>({ name: '' })
  const viewableItems = useSharedValue<ViewToken[]>([])

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['searchLectures', request],
    ({ pageParam = 0 }) => searchLectures(request, pageParam, 30),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? null : allPages.length
    }
  )

  const onEndReachedHandler = useCallback(() => {
    if (hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage])

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setRequest={setRequest} />
      <Filter request={request} setRequest={setRequest} />
      <FlatList
        style={styles.list}
        data={data?.pages.flat()}
        renderItem={({ item }) => (
          <LectureItem lecture={item} viewableItems={viewableItems} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={0.4}
        onViewableItemsChanged={({ viewableItems: items }) => {
          viewableItems.value = items
        }}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : <></>}
        ListEmptyComponent={
          <Animated.View
            style={styles.emptyMessage}
            entering={FadeIn.duration(500)}>
            <Text>검색된 강의가 없습니다.</Text>
          </Animated.View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    padding: 10
  },
  list: {
    width: '100%'
  },
  emptyMessage: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LectureScreen
