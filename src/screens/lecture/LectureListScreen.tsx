import { useCallback, useEffect, useState } from 'react'
import { getFilter, searchLecturePage } from '../../module/lecture/api.ts'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import LectureItem, { SkeletonLectureItem } from '../../components/lecture/LectureItem.tsx'
import SearchBar from '../../components/common/SearchBar.tsx'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { useInfiniteQuery, useQuery } from 'react-query'
import { SearchLecturePageRequest } from '../../module/lecture/types/request'
import FilterItem from '../../components/lecture/FilterItem.tsx'
import { NavigatorParamList } from '../../navigators/navigation'
import FilterModal from '../../components/lecture/FilterModal.tsx'
import { NavigationProp } from '@react-navigation/native'
import { AnimatedView } from '../../components/common/Animated.tsx'
import Text from '../../components/common/Text.tsx'
import { createSkeletonArray } from '../../lib/util/skeleton.ts'
import TouchableScale from '../../components/common/TouchableScale.tsx'
import { useSelector } from 'react-redux'
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar.tsx'

interface Props {
  navigation: NavigationProp<NavigatorParamList, 'lectureList'>
}

const now = new Date()

const pageSize = 30

const filterNames: { [key: string]: string } = {
  // year: '연도',
  grade: '학년',
  semester: '학기',
  major: '전공',
  credit: '학점'
}

const LectureListScreen = ({ navigation }: Props) => {
  const student = useSelector((store: Store) => store.student)
  const [searchRequest, setSearchRequest] = useState<SearchLecturePageRequest>({ year: now.getFullYear(), name: '' })
  const [name, setName] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')
  const [modal, setModal] = useState(false)
  const { data: filter } = useQuery(['getFilter'], getFilter, {
    select: data => ({
      ...data,
      major: data.major.sort((a, b) => {
        const isIncluded = (major: string) => major.includes(student.major)

        if (isIncluded(a) && !isIncluded(b)) {
          return -1
        } else if (!isIncluded(a) && isIncluded(b)) {
          return 1
        } else {
          return 0
        }
      })
    })
  })
  const {
    data: infiniteLectures,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery(
    ['searchLecturePage', searchRequest],
    ({ pageParam = undefined }) => searchLecturePage(searchRequest, pageSize, pageParam),
    {
      getNextPageParam: lastPage => {
        const lastItem = lastPage[lastPage.length - 1]

        return lastItem ? lastItem.id : undefined
      },
      staleTime: 1e7,
      cacheTime: 1e7
    }
  )

  const onEndReachedHandler = useCallback(() => {
    if (hasNextPage && !isFetching) fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  useEffect(() => {
    setSearchRequest(current => ({ ...current, name }))
  }, [name])

  return (
    <AnimatedView
      style={{
        flex: 1,
        backgroundColor: 'rgb(250, 250, 250)'
      }}
      entering={FadeIn.duration(300)}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="rgb(250, 250, 250)" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <SearchBar setText={setName} placeholder="강의명을 입력해주세요." />
          </View>
          <View style={styles.filters}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {Object.keys(filterNames).map(filter => (
                <TouchableScale
                  activeOpacity={0.8}
                  key={filter}
                  onPress={() => {
                    setCurrentFilter(filter)
                    setModal(true)
                  }}>
                  <FilterItem filter={filter} searchRequest={searchRequest} />
                </TouchableScale>
              ))}
            </ScrollView>
          </View>
          {isLoading ? (
            <FlatList
              data={createSkeletonArray(8)}
              renderItem={() => <SkeletonLectureItem />}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            />
          ) : (
            <FlatList
              data={infiniteLectures?.pages.flat()}
              renderItem={({ item }) => (
                <TouchableScale
                  activeScale={0.98}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('lectureInfo', { lecture: item })}>
                  <AnimatedView entering={FadeIn.duration(500)}>
                    <LectureItem lecture={item} />
                  </AnimatedView>
                </TouchableScale>
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              onEndReached={onEndReachedHandler}
              onEndReachedThreshold={0.4}
              keyboardDismissMode="on-drag"
              ListFooterComponent={
                isLoading || isFetchingNextPage ? (
                  <FlatList
                    style={{ gap: 10 }}
                    data={createSkeletonArray(8)}
                    renderItem={() => <SkeletonLectureItem />}
                    keyExtractor={item => item.toString()}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <></>
                )
              }
              ListEmptyComponent={
                isLoading || isFetchingNextPage ? (
                  <></>
                ) : (
                  <AnimatedView
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 500
                    }}
                    entering={FadeIn.duration(500)}
                    exiting={FadeOut.duration(500)}>
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 14
                      }}>
                      검색된 강의가 없습니다.
                    </Text>
                  </AnimatedView>
                )
              }
            />
          )}
        </View>
        {filter && (
          <FilterModal
            isVisible={modal}
            setIsVisible={setModal}
            searchRequest={searchRequest}
            setSearchRequest={setSearchRequest}
            filter={filter}
            currentFilter={currentFilter}
          />
        )}
      </SafeAreaView>
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 10,
    paddingTop: 8
  },
  filters: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4
  }
})

export { filterNames }
export default LectureListScreen
