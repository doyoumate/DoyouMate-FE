import { Dimensions, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { Ionicons } from '../../lib/icon/icons.ts'
import BoardModal from '../board/BoardModal.tsx'
import Carousel from 'react-native-snap-carousel'
import { PostResponse } from '../../module/post/types/response'
import { useNavigation } from '@react-navigation/native'
import ImageSelectSection from './ImageSelectSection.tsx'
import EditableImageSlide from './EditableImageSlide.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import { UseMutateFunction } from 'react-query'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useImageAction from '../../module/post/hooks/useImage.ts'
import useInput from '../../lib/hooks/useInput.ts'
import { UpdatePostRequest } from '../../module/post/types/request'
import useForm from '../../lib/hooks/useForm.ts'
import TextInput from '../common/TextInput.tsx'

interface Props {
  post?: PostResponse
  editHandler: UseMutateFunction<PostResponse, unknown, UpdatePostRequest>
}

const maxImageCount = 3

const PostEditor = ({ post, editHandler }: Props) => {
  const navigation = useNavigation()
  const titleStates = useInput('title', {
    canEmpty: false,
    maxLength: 20,
    initialValue: post?.title
  })
  const contentStates = useInput('content', {
    canEmpty: false,
    maxLength: 800,
    initialValue: post?.content
  })
  const { value: title, ref: titleRef } = titleStates
  const { value: content, setValue: setContent, ref: contentRef } = contentStates
  const { isSubmittable } = useForm(titleStates, contentStates)
  const [board, setBoard] = useState(post?.board)
  const [images, setImages] = useState(
    post?.images.map(uri => ({
      name: uri.match(/\/([0-9a-fA-F-]+)$/)!![1],
      type: 'image/jpeg',
      uri
    })) ?? []
  )
  const [isImageUpdated, setIsImageUpdated] = useState<boolean>()
  const [modal, setModal] = useState(false)
  const [index, setIndex] = useState(0)
  const carouselRef = useRef<Carousel<string>>(null)
  const imageStates = useImageAction(images, setImages, index, setIndex, carouselRef?.current)

  useEffect(() => {
    if (!isImageUpdated) setIsImageUpdated(true)
  }, [images])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableScale
          activeOpacity={0.8}
          disabled={!(isSubmittable && board)}
          onPress={() =>
            editHandler({
              boardId: board!.id,
              title,
              content: content.replace(/\n\n+/g, '\n\n'),
              images,
              isImageUpdated
            })
          }>
          <Ionicons name="pencil-outline" size={22} color={isSubmittable && board ? 'black' : 'grey'} />
        </TouchableScale>
      )
    })
  }, [board, title, content, images, isSubmittable])

  return (
    <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.image}>
        {images.length === 0 ? (
          <ImageSelectSection imageStates={imageStates} />
        ) : (
          <EditableImageSlide
            images={images}
            index={index}
            setIndex={setIndex}
            imageStates={imageStates}
            ref={carouselRef}
          />
        )}
      </View>
      <View
        style={{
          paddingHorizontal: 18,
          gap: 10
        }}>
        <TouchableWithoutFeedback onPress={titleRef.current?.focus}>
          <View style={styles.input}>
            <TextInput
              inputStates={titleStates}
              style={{
                flex: 1,
                fontSize: 13,
                fontWeight: 'normal'
              }}
              placeholder="제목"
              maxLength={titleStates.options?.maxLength}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setModal(true)}>
          <View style={styles.input} pointerEvents="none">
            <TextInput
              style={{
                flex: 1,
                fontSize: 13,
                fontWeight: 'bold'
              }}
              value={board ? `${board.name} 게시판` : ''}
              placeholder="게시판"
              editable={false}
              onChangeText={text => `${text} 게시판`}
            />
          </View>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={contentRef.current?.focus}>
          <View
            style={[
              styles.input,
              {
                alignItems: 'flex-start',
                height: 200
              }
            ]}>
            <TextInput
              inputStates={contentStates}
              style={{
                flex: 1,
                fontSize: 13,
                lineHeight: 20,
                fontWeight: 'normal'
              }}
              placeholder="내용"
              maxLength={contentStates.options?.maxLength}
              multiline
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <BoardModal isVisible={modal} setIsVisible={setModal} board={board} setBoard={setBoard} />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12
  },
  image: {
    width: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').width,
    marginBottom: 16
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    backgroundColor: 'rgb(250, 250, 250)',
    borderBottomWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)'
  }
})

export { maxImageCount }
export default PostEditor
