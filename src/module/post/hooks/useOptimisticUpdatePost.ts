import { InfiniteData, MutationFunction, useMutation, UseMutationResult, useQueryClient } from 'react-query'
import { PostResponse } from '../types/response'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { UseMutationOptions } from 'react-query/types/react/types'

const useOptimisticUpdatePost = <TData = unknown, TVariables = void>(
  mutationFn: MutationFunction<TData, TVariables>,
  updater: (posts: PostResponse[] | undefined, variables: TVariables) => PostResponse[],
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, 'mutationFn'>
): UseMutationResult<TData, unknown, TVariables> => {
  const searchRequest = useSelector((store: Store) => store.post.searchRequest)
  const queryClient = useQueryClient()
  const queryKeys = useMemo(
    () => ({
      searchPostPage: ['searchPostPage', searchRequest],
      getLikedPostPage: ['getLikedPostPage'],
      getMyPostPage: ['getMyPostPage']
    }),
    [searchRequest]
  )

  return useMutation(mutationFn, {
    onMutate: async variables => {
      const previousInfinitePosts = Object.fromEntries(
        Object.entries(queryKeys).map(([name, queryKeys]) => [
          name,
          queryClient.getQueryData<InfiniteData<PostResponse[]>>(queryKeys)
        ])
      ) as { [Key in keyof typeof queryKeys]: InfiniteData<PostResponse[]> | undefined }
      const previousPosts = queryClient.getQueryData<PostResponse[]>(['getPopularPosts']) ?? []

      await queryClient.cancelQueries({ queryKey: [...Object.keys(queryKeys), 'getPopularPosts'] })

      Object.values(queryKeys).forEach(queryKeys =>
        queryClient.setQueriesData<InfiniteData<PostResponse[]>>(queryKeys, data => ({
          pages: data?.pages.map(page => updater(page, variables)) ?? [[]],
          pageParams: data?.pageParams ?? []
        }))
      )
      queryClient.setQueriesData<PostResponse[]>(['getPopularPosts'], data => updater(data, variables))
      const context = options?.onMutate && options.onMutate(variables)

      return {
        previousInfinitePosts,
        previousPosts,
        ...(context ?? {})
      }
    },
    onSuccess: options?.onSuccess,
    onError: (error, variables, context) => {
      Object.entries(context!.previousInfinitePosts).map(([name, infinitePost]) => {
        queryClient.setQueriesData<InfiniteData<PostResponse[]>>(queryKeys[name as keyof typeof queryKeys], {
          pages: infinitePost?.pages ?? [[]],
          pageParams: infinitePost?.pageParams ?? []
        })
      })
      queryClient.setQueriesData<PostResponse[]>(['getPopularPosts'], context!.previousPosts)
      options?.onError && options.onError(error, variables, context)
    },
    onSettled: options?.onSettled
  })
}

export default useOptimisticUpdatePost
