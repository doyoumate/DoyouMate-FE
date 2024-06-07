import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getStudent } from '../../student/api.ts'
import { useQuery } from 'react-query'
import { setStudent } from '../../../redux/reducers/studentReducer.ts'

const useAuthentication = () => {
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch()
  const { isLoading } = useQuery(['getStudent'], getStudent, {
    onSuccess: student => {
      dispatch(setStudent(student))
      setIsLogin(true)
    }
  })

  return { isLoading, isLogin }
}

export default useAuthentication
