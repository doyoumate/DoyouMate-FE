import { FlatList, FlatListProps, RefreshControl } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import PostItem, { SkeletonPostItem } from './PostItem.tsx'
import Line from '../common/Line.tsx'
import { createSkeletonArray } from '../../lib/util/skeleton.ts'
import { PostResponse } from '../../module/post/types/response'
import { AnimatedView } from '../common/Animated.tsx'
import Text from '../common/Text.tsx'
import { useInfiniteQuery } from 'react-query'
import { useCallback, useState } from 'react'

interface Props extends Omit<FlatListProps<PostResponse>, 'renderItem' | 'data'> {
  queryKey: unknown[]
  queryFn: (pageParam?: string) => Promise<PostResponse[]>
  useRefresh?: boolean
}

const PostList = ({ queryKey, queryFn, useRefresh, ...props }: Props) => {
  const [refreshing] = useState(false)
  const {
    data: infinitePosts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery(queryKey, ({ pageParam = undefined }) => queryFn(pageParam), {
    getNextPageParam: lastPage => {
      const lastItem = lastPage[lastPage.length - 1]

      return lastItem ? lastItem.createdDate : undefined
    }
  })

  const fetchNextPageHandler = useCallback(() => {
    if (hasNextPage && !isFetching) fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  return (
    <FlatList
      data={infinitePosts?.pages.flat()}
      renderItem={({ item }) => (
        <>
          <PostItem post={item} />
          <Line />
        </>
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.4}
      onEndReached={fetchNextPageHandler}
      keyboardDismissMode="on-drag"
      refreshControl={useRefresh ? <RefreshControl refreshing={refreshing} onRefresh={refetch} /> : <></>}
      ListFooterComponent={isLoading || isFetchingNextPage ? <SkeletonPostList /> : <></>}
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
              게시글이 없습니다.
            </Text>
          </AnimatedView>
        )
      }
      {...props}
    />
  )
}

const SkeletonPostList = () => {
  return (
    <FlatList
      style={{ gap: 12 }}
      data={createSkeletonArray(3)}
      renderItem={() => (
        <>
          <SkeletonPostItem />
          <Line />
        </>
      )}
      keyExtractor={item => item.toString()}
      showsVerticalScrollIndicator={false}
    />
  )
}

export { SkeletonPostList }
export default PostList
