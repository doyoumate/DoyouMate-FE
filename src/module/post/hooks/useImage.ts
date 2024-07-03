import { File } from '../../common'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { maxImageCount } from '../../../components/post/PostEditor.tsx'
import { Alert } from 'react-native'
import { setIsLoading } from '../../../redux/reducers/loadingReducer.ts'
import ImagePicker from 'react-native-image-crop-picker'

interface ImageActionStates {
  addHandler: () => void
  replaceHandler: () => void
  removeHandler: () => void
  editHandler: () => void
}

const useImageAction = (
  images: File[],
  setImages: Dispatch<SetStateAction<File[]>>,
  index: number,
  setIndex: Dispatch<SetStateAction<number>>
) => {
  const dispatch = useDispatch()

  const addHandler = useCallback(() => {
    if (images.length === maxImageCount) {
      Alert.alert(`이미지는 최대 ${maxImageCount}개까지 업로드 가능합니다.`)
    } else {
      dispatch(setIsLoading(true))
      ImagePicker.openPicker({
        mediaType: 'photo',
        width: 1024,
        height: 1024,
        cropping: true
      })
        .then(response => {
          if (response.size > 1e6) {
            Alert.alert('이미지 크기는 1MB 이하여야 합니다.')
          } else {
            setImages(current => {
              const newImages = [...current]

              newImages.splice(index + 1, 0, {
                name: response.filename!,
                type: response.mime,
                uri: response.path
              })

              return newImages
            })
          }

          if (images.length !== 0) setIndex(current => current + 1)
        })
        .catch(() => {})
        .finally(() => {
          dispatch(setIsLoading(false))
        })
    }
  }, [images, index])

  const replaceHandler = useCallback(() => {
    dispatch(setIsLoading(true))
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 1024,
      height: 1024,
      cropping: true
    })
      .then(response => {
        if (response.size > 1e6) {
          Alert.alert('이미지 크기는 1MB 이하여야 합니다.')
        } else {
          setImages(current => {
            const newImages = [...current]

            newImages.splice(index, 1, {
              name: response.filename!,
              type: response.mime,
              uri: response.path
            })

            return newImages
          })
        }
      })
      .catch(() => {})
      .finally(() => dispatch(setIsLoading(false)))
  }, [images, index])

  const removeHandler = useCallback(() => {
    setImages(current => [...current].filter((image, idx) => idx !== index))
    if (index !== 0 && index === images.length - 1) setIndex(current => current - 1)
  }, [index, images])

  const editHandler = useCallback(() => {
    dispatch(setIsLoading(true))
    ImagePicker.openCropper({
      mediaType: 'photo',
      width: 1024,
      height: 1024,
      path: images[index].uri
    })
      .then(response =>
        setImages(current => {
          const newImages = [...current]

          newImages[index] = {
            name: response.filename!,
            type: response.mime,
            uri: response.path
          }

          return newImages
        })
      )
      .catch(() => {})
      .finally(() => dispatch(setIsLoading(false)))
  }, [index, images])

  return { addHandler, replaceHandler, removeHandler, editHandler }
}

export type { ImageActionStates }
export default useImageAction
