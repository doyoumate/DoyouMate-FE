import { useCallback, useEffect, useState } from 'react'
import { getFilter, searchLectures } from '../../module/lecture/api.ts'
import { FilterResponse } from '../../module/lecture/dto/response'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LectureItem from '../../components/LectureItem.tsx'
import SearchBar from '../../components/SearchBar.tsx'
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated'
import { useInfiniteQuery } from 'react-query'
import { SearchLecturesRequest } from '../../module/lecture/dto/request'
import FilterItem from '../../components/FilterItem.tsx'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList } from '../../navigators/navigation'
import FilterModal from '../../components/FilterModal.tsx'
import { useAsyncEffect } from '../../lib/hook.ts'

interface Props {
  navigation: StackNavigationProp<NavigatorParamList, 'lectureList'>
}

const now = new Date()

const filterNames: { [key: string]: string } = {
  // year: '연도',
  grade: '학년',
  semester: '학기',
  major: '전공',
  credit: '학점'
}

const LectureListScreen = ({ navigation }: Props) => {
  const [request, setRequest] = useState<SearchLecturesRequest>({ year: now.getFullYear(), name: '' })
  const [name, setName] = useState('')
  const [filter, setFilter] = useState<FilterResponse>()
  const [currentFilter, setCurrentFilter] = useState('')
  const [modal, setModal] = useState(false)
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['searchLectures', request],
    ({ pageParam = 0 }) => searchLectures(request, pageParam, 30),
    {
      getNextPageParam: (lastPage, allPages) => (lastPage.length === 0 ? null : allPages.length)
    }
  )

  const onEndReachedHandler = useCallback(async () => {
    if (hasNextPage && !isFetching) await fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  useAsyncEffect(async () => {
    setFilter(await getFilter())
  }, [])

  useEffect(() => {
    setRequest(current => ({ ...current, name }))
  }, [name])

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(1000).easing(Easing.out(Easing.quad))}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <SearchBar setContent={setName} placeholder="강의명을 입력해주세요." />
          </View>
          <View style={styles.filters}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ overflow: 'visible' }}>
              {Object.keys(filterNames).map(filter => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={filter}
                  onPress={() => {
                    setCurrentFilter(filter)
                    setModal(true)
                  }}>
                  <FilterItem filter={filter} request={request} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={data?.pages.flat()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('lectureInfo', { lecture: item })}>
                <Animated.View entering={FadeIn.duration(500).easing(Easing.inOut(Easing.quad))}>
                  <LectureItem lecture={item} />
                </Animated.View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
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
                  검색된 강의가 없습니다.
                </Text>
              </Animated.View>
            }
          />
        </View>
        {filter && (
          <FilterModal
            isVisible={modal}
            setIsVisible={setModal}
            request={request}
            setRequest={setRequest}
            filter={filter}
            currentFilter={currentFilter}
          />
        )}
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
  filters: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4
  }
})

export { filterNames }
export default LectureListScreen
