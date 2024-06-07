import { useQuery } from 'react-query'
import { UpdatePostRequest } from '../../module/post/types/request'
import { updatePostById } from '../../module/post/api.ts'
import { Alert } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import PostEditor from '../../components/post/PostEditor.tsx'
import { getBoards } from '../../module/board/api.ts'
import useOptimisticUpdatePost from '../../module/post/hooks/useOptimisticUpdatePost.ts'

interface Props {
  navigation: NavigationProp<NavigatorParamList, 'postUpdate'>
  route: RouteProp<NavigatorParamList, 'postUpdate'>
}

const PostUpdateScreen = ({ navigation, route }: Props) => {
  const { post } = route.params
  const { data: boards = [] } = useQuery(['getBoards'], getBoards)

  const { mutate: updatePost } = useOptimisticUpdatePost(
    (request: UpdatePostRequest) => updatePostById(post.id, request),
    (posts, request) => {
      const newPosts = [...(posts ?? [])]
      const index = newPosts?.findIndex(_post => _post.id === post.id)

      if (index > -1) {
        newPosts[index] = {
          ...newPosts[index],
          ...request,
          board: boards.filter(board => board.id === request.boardId)[0],
          images: request.images.map(image => image.uri)
        }
      }

      return newPosts
    },
    {
      onMutate: () => {
        navigation.goBack()
        Alert.alert('게시글이 수정되었습니다.')
      }
    }
  )

  return <PostEditor post={post} editHandler={updatePost} />
}

export default PostUpdateScreen
