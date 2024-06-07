import { PostResponse } from '../types/response'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { setCommentIds } from '../../../redux/reducers/postReducer.ts'

interface CommentStates {
  count?: number
  setHandler: (ids: string[]) => void
  addHandler: (id: string) => void
  removeHandler: (id: string) => void
}

const useComment = (post: PostResponse): CommentStates => {
  const commentIds = useSelector((store: Store) => store.post.comment[post.id]?.commentIds)
  const [count, setCount] = useState<number>()
  const dispatch = useDispatch()

  const setHandler = useCallback(
    (ids: string[]) =>
      dispatch(
        setCommentIds({
          id: post!!.id,
          commentIds: ids
        })
      ),
    []
  )

  const addHandler = useCallback((id: string) => commentIds && setHandler([...commentIds, id]), [commentIds])

  const removeHandler = useCallback(
    (id: string) => commentIds && setHandler(commentIds.filter(commentId => commentId !== id)),
    [commentIds]
  )

  useEffect(() => {
    if (commentIds) setCount(commentIds.length)
  }, [commentIds])

  useEffect(() => {
    dispatch(
      setCommentIds({
        id: post.id,
        commentIds: post.commentIds
      })
    )
  }, [post.commentIds])

  return { count, setHandler, addHandler, removeHandler }
}

export type { CommentStates }
export default useComment
