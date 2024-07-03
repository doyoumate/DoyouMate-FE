import { View } from 'react-native'
import TouchableScale from '../common/TouchableScale.tsx'
import { MaterialCommunityIcons } from '../../lib/icon/icons.ts'
import Text from '../common/Text.tsx'
import { ImageActionStates } from '../../module/post/hooks/useImage.ts'

interface Props {
  imageStates: ImageActionStates
}

const ImageSelectSection = ({ imageStates }: Props) => {
  const { addHandler: addImageHandler } = imageStates

  return (
    <View
      style={{
        flex: 1,
        padding: 10
      }}>
      <TouchableScale
        style={{ flex: 1 }}
        containerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          borderRadius: 15,
          backgroundColor: 'rgb(240, 240, 240)'
        }}
        activeOpacity={0.8}
        onPress={addImageHandler}>
        <MaterialCommunityIcons name="file-image-plus-outline" size={42} color="rgb(150, 150, 150)" />
        <Text
          style={{
            fontWeight: 'normal',
            fontSize: 14,
            color: 'rgb(150, 150, 150)'
          }}>
          이미지 추가하기
        </Text>
      </TouchableScale>
    </View>
  )
}

export default ImageSelectSection
