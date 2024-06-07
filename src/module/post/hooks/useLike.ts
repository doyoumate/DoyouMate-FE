import { PostResponse } from '../types/response'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { setLikedStudentIds } from '../../../redux/reducers/postReducer.ts'
import { useDebouncing } from '../../../lib/hooks/useDebouncing.ts'
import { likePostById } from '../api.ts'

interface LikeStates {
  count?: number
  isLiked?: boolean
  likeHandler: () => void
}

const useLike = (post: PostResponse): LikeStates => {
  const student = useSelector((store: Store) => store.student)
  const likedStudentIds = useSelector((store: Store) => store.post.like[post.id]?.likedStudentIds)
  const [initialIsLiked, setInitialIsLiked] = useState<boolean>()
  const [isLiked, setIsLiked] = useState<boolean>()
  const [count, setCount] = useState<number>()
  const dispatch = useDispatch()

  const likeHandler = useCallback(() => {
    setCount(current => (isLiked ? current! - 1 : current! + 1))
    setIsLiked(current => !current)
  }, [isLiked])

  useEffect(() => {
    if (likedStudentIds) {
      setInitialIsLiked(likedStudentIds.includes(student.id))
      setIsLiked(likedStudentIds.includes(student.id))
      setCount(likedStudentIds.length)
    }
  }, [likedStudentIds])

  useEffect(() => {
    dispatch(
      setLikedStudentIds({
        id: post.id,
        likedStudentIds: post.likedStudentIds
      })
    )
  }, [post])

  useDebouncing(
    async () => {
      if (initialIsLiked !== isLiked) {
        const newPost = await likePostById(post.id)

        dispatch(
          setLikedStudentIds({
            id: post.id,
            likedStudentIds: newPost.likedStudentIds
          })
        )
      }
    },
    500,
    [isLiked]
  )

  return { count, isLiked, likeHandler }
}

export type { LikeStates }
export default useLike
