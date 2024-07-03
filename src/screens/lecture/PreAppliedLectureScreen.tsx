import { useQuery } from 'react-query'
import { getPreAppliedLectures } from '../../module/lecture/api.ts'
import MyLectureList from '../../components/lecture/MyLectureList.tsx'

const PreAppliedLectureScreen = () => {
  const { data: lectures = [], isLoading } = useQuery(['getPreAppliedLectures'], getPreAppliedLectures, {
    staleTime: 6e5,
    cacheTime: 6e5
  })

  return <MyLectureList lectures={lectures} isLoading={isLoading} />
}

export default PreAppliedLectureScreen
