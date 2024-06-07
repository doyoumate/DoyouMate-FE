import { getMyPostPage } from '../../module/post/api.ts'
import PostList from '../../components/post/PostList.tsx'

const pageSize = 30

const MyPostScreen = () => {
  return <PostList queryKey={['getMyPostPage']} queryFn={pageParam => getMyPostPage(pageSize, pageParam)} />
}

export default MyPostScreen
