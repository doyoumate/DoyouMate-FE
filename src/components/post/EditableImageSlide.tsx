import { StyleSheet, View } from 'react-native'
import { Foundation, MaterialCommunityIcons, Octicons } from '../../lib/icon/icons.ts'
import { maxImageCount } from './PostEditor.tsx'
import { File } from '../../module/common'
import { Dispatch, SetStateAction } from 'react'
import ImageSlide from './ImageSlide.tsx'
import { ImageActionStates } from '../../module/post/hooks/useImage.ts'
import TouchableScale from '../common/TouchableScale.tsx'

interface Props {
  images: File[]
  index: number
  setIndex: Dispatch<SetStateAction<number>>
  imageStates: ImageActionStates
}

const EditableImageSlide = ({ images, index, setIndex, imageStates }: Props) => {
  const {
    addHandler: addImageHandler,
    replaceHandler: replaceImageHandler,
    removeHandler: removeImageHandler,
    editHandler: editImageHandler
  } = imageStates

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        {images.length < maxImageCount && (
          <TouchableScale style={styles.option} activeOpacity={0.8} onPress={addImageHandler}>
            <MaterialCommunityIcons name="plus" size={18} color="white" />
          </TouchableScale>
        )}
        <TouchableScale style={styles.option} activeOpacity={0.8} onPress={editImageHandler}>
          <Foundation name="crop" size={18} color="white" />
        </TouchableScale>
        <TouchableScale style={styles.option} activeOpacity={0.8} onPress={replaceImageHandler}>
          <Octicons style={{ transform: [{ rotate: '-45deg' }] }} name="arrow-switch" size={16} color="white" />
        </TouchableScale>
        <TouchableScale style={styles.option} activeOpacity={0.8} onPress={removeImageHandler}>
          <MaterialCommunityIcons name="trash-can-outline" size={18} color="white" />
        </TouchableScale>
      </View>
      <ImageSlide images={images.map(image => image.uri)} index={index} setIndex={setIndex} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  options: {
    flexDirection: 'row',
    gap: 6,
    position: 'absolute',
    top: 4,
    right: 12,
    marginVertical: 8,
    zIndex: 99
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 100,
    backgroundColor: 'rgb(60, 60, 60)',
    textAlign: 'center',
    opacity: 0.8
  }
})

export default EditableImageSlide
