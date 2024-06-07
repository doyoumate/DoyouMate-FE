import { Alert } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import { createPost } from '../../module/post/api.ts'
import { useMutation, useQueryClient } from 'react-query'
import { CreatePostRequest } from '../../module/post/types/request'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../../redux/reducers/loadingReducer.ts'
import PostEditor from '../../components/post/PostEditor.tsx'

interface Props {
  navigation: NavigationProp<NavigatorParamList, 'postWrite'>
}

const PostWriteScreen = ({ navigation }: Props) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate: submitPost } = useMutation((request: CreatePostRequest) => createPost(request), {
    onMutate: () => dispatch(setIsLoading(true)),
    onSuccess: () => {
      navigation.goBack()
      Alert.alert('게시글이 작성되었습니다.')
      queryClient.invalidateQueries(['searchPostPage'])
    },
    onSettled: () => {
      dispatch(setIsLoading(false))
    }
  })

  return <PostEditor editHandler={submitPost} />
}
export default PostWriteScreen
