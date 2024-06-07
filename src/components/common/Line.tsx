import { StyleProp, View, ViewStyle } from 'react-native'

interface Props {
  style?: StyleProp<ViewStyle>
}

const Line = ({ style }: Props) => {
  return (
    <View
      style={[
        {
          height: 0.4,
          marginVertical: 4,
          backgroundColor: 'rgb(200, 200, 200)'
        },
        style
      ]}
    />
  )
}

export default Line
