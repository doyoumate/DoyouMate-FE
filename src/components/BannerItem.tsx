import { Dimensions, Image, ImageSourcePropType, Linking, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  image: ImageSourcePropType
  link: string
}

const BannerItem = ({ image, link }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        Linking.openURL(link)
      }}>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.85,
    height: '90%',
    borderRadius: 10,
    backgroundColor: 'rgb(250, 250, 250)',
    shadowColor: 'rgb(160, 160, 160)',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowRadius: 5,
    elevation: 5
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12
  }
})

export default BannerItem
