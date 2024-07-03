import { useQuery } from 'react-query'
import MyLectureList from '../../components/lecture/MyLectureList.tsx'
import { getAppliedLectures } from '../../module/lecture/api.ts'

const AppliedLectureScreen = () => {
  const { data: lectures = [], isLoading } = useQuery(['getAppliedLectures'], getAppliedLectures, {
    staleTime: 6e5,
    cacheTime: 6e5
  })

  return <MyLectureList lectures={lectures} isLoading={isLoading} />
}
export default AppliedLectureScreen
