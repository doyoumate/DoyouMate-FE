import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { NavigatorParamList } from '../../navigators/navigation'
import { Ionicons } from '../../lib/icon.ts'
import { BoardResponse } from '../../module/board/dto/response'
import { isAxiosError } from 'axios'
import { openModal } from '../../redux/reducers/alertReducer.tsx'
import { useDispatch } from 'react-redux'
import BoardModal from '../../components/BoardModal.tsx'
import { createPost } from '../../module/post/api.ts'

interface Props {
  route: RouteProp<NavigatorParamList, 'postWrite'>
}

const PostWriteScreen = ({ route }: Props) => {
  const navigator = useNavigation()
  const { boards } = route.params
  const [title, setTitle] = useState('')
  const [board, setBoard] = useState<BoardResponse>()
  const [content, setContent] = useState('')
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  const submitHandler = useCallback(async () => {
    try {
      await createPost({
        boardId: board!.id,
        title: title,
        content: content
      })

      dispatch(openModal('게시글 작성이 정상적으로 처리되었습니다.'))
      navigator.goBack()
    } catch (error) {
      if (isAxiosError(error)) dispatch(openModal(error.response!.data.message))
    }
  }, [board, title, content, dispatch, navigator])

  useEffect(() => {
    navigator.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={submitHandler} activeOpacity={0.8}>
          <Ionicons name="pencil-outline" size={22} />
        </TouchableOpacity>
      )
    })
  }, [navigator, submitHandler])

  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>
        <View style={styles.input}>
          <TextInput
            style={{
              flex: 1,
              fontFamily: 'NanumSquare_acR',
              fontSize: 13
            }}
            value={title}
            placeholder="제목"
            placeholderTextColor="grey"
            maxLength={20}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setModal(true)}>
          <View style={styles.input}>
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'NanumSquare_acR',
                fontSize: 13
              }}
              value={board ? `${board.name} 게시판` : ''}
              placeholder="게시판"
              placeholderTextColor="grey"
              maxLength={10}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.input,
            {
              alignItems: 'flex-start',
              height: 200
            }
          ]}>
          <TextInput
            style={{
              flex: 1,
              fontFamily: 'NanumSquare_acR',
              fontSize: 13,
              lineHeight: 20
            }}
            value={content}
            placeholder="내용"
            placeholderTextColor="grey"
            maxLength={800}
            multiline
            onChangeText={text => setContent(text)}
          />
        </View>
      </View>
      <BoardModal isVisible={modal} setIsVisible={setModal} boards={boards} board={board} setBoard={setBoard} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 18
  },
  boards: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    backgroundColor: 'rgb(250, 250, 250)',
    borderBottomWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)'
  },
  submit: {}
})

export default PostWriteScreen
