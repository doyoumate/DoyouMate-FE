import { useCallback, useEffect, useState } from 'react'
import { likePostById } from './api.ts'
import { PostResponse } from './dto/response'
import { useSelector } from 'react-redux'
import { useDebouncing } from '../../lib/debounce.ts'

const useLike = (post: PostResponse) => {
  const student = useSelector((store: Store) => store.student)
  const [initialIsLiked, setInitialIsLiked] = useState(post.likedStudentIds.includes(student.id))
  const [isLiked, setIsLiked] = useState(post.likedStudentIds.includes(student.id))
  const [like, setLike] = useState(post.likedStudentIds.length)

  const likeHandler = useCallback(async () => {
    setLike(current => (isLiked ? current - 1 : current + 1))
    setIsLiked(current => !current)
  }, [isLiked])

  useDebouncing(
    async () => {
      if (initialIsLiked !== isLiked) {
        setInitialIsLiked((await likePostById(post.id)).likedStudentIds.includes(student.id))
      }
    },
    500,
    [isLiked, post.id, student.id]
  )

  useEffect(() => {
    setIsLiked(post.likedStudentIds.includes(student.id))
  }, [post.likedStudentIds, student.id])

  return { like, isLiked, likeHandler }
}

export { useLike }
