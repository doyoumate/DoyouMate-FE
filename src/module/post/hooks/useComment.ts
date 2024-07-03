import { PostResponse } from '../types/response'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { setCommentCount } from '../../../redux/reducers/postReducer.ts'

interface CommentStates {
  count?: number
  setHandler: (count: number) => void
  addHandler: () => void
  removeHandler: () => void
}

const useComment = (post: PostResponse): CommentStates => {
  const count = useSelector((store: Store) => store.post.comment[post.id]?.count)
  const dispatch = useDispatch()

  const setHandler = useCallback(
    (count: number) =>
      dispatch(
        setCommentCount({
          id: post!!.id,
          count
        })
      ),
    []
  )

  const addHandler = useCallback(() => count && setHandler(count + 1), [count])

  const removeHandler = useCallback(() => count && setHandler(count - 1), [count])

  useEffect(() => {
    dispatch(
      setCommentCount({
        id: post.id,
        count: post.commentIds.length
      })
    )
  }, [post.commentIds])

  return { count, setHandler, addHandler, removeHandler }
}

export type { CommentStates }
export default useComment
