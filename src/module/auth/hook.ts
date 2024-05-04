import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getStudent } from '../student/api.ts'
import { setStudent } from '../../redux/reducers/studentReducer.ts'
import { useAsyncEffect } from '../../lib/hook.ts'

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch()

  useAsyncEffect(async () => {
    try {
      const student = await getStudent()
      dispatch(setStudent(student))
      setIsLogin(true)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, isLogin }
}

export { useAuthentication }
