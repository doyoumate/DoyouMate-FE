import { getLikedPostPage } from '../../module/post/api.ts'
import PostList from '../../components/post/PostList.tsx'

const pageSize = 30

const MyLikedPostScreen = () => {
  return <PostList queryKey={['getLikedPostPage']} queryFn={pageParam => getLikedPostPage(pageSize, pageParam)} />
}

export default MyLikedPostScreen
