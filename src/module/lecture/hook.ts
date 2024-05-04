import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { LectureResponse } from './dto/response'
import { useDebouncing } from '../../lib/debounce.ts'
import { markLectureById } from './api.ts'
import { setStudent } from '../../redux/reducers/studentReducer.ts'
import { getStudent } from '../student/api.ts'

const useMark = (lecture: LectureResponse) => {
  const student = useSelector((store: Store) => store.student)
  const [initialIsMarked, setInitialIsMarked] = useState(student.markedLectureIds.includes(lecture.id))
  const [isMarked, setIsMarked] = useState(student.markedLectureIds.includes(lecture.id))
  const dispatch = useDispatch()

  const markHandler = useCallback(async () => {
    setIsMarked(current => !current)
  }, [])

  useDebouncing(
    async () => {
      if (initialIsMarked !== isMarked) {
        await markLectureById(lecture.id)
        setInitialIsMarked(dispatch(setStudent(await getStudent())).payload.markedLectureIds.includes(lecture.id))
      }
    },
    500,
    [isMarked]
  )

  useEffect(() => {
    setIsMarked(student.markedLectureIds.includes(lecture.id))
  }, [student.markedLectureIds, lecture.id])

  return { isMarked, markHandler }
}

export { useMark }
