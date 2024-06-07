import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import { MaterialIcons } from '../lib/icon/icons.ts'
import { ReactNode } from 'react'
import Text from './common/Text.tsx'
import TouchableScale from './common/TouchableScale.tsx'

interface Props {
  name: string
  icon: ReactNode
  onPressHandler?: (event: GestureResponderEvent) => void
}

const MenuItem = ({ name, icon, onPressHandler }: Props) => {
  return (
    <TouchableScale activeScale={0.99} activeOpacity={0.8} onPress={onPressHandler}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
          }}>
          {icon}
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold'
            }}>
            {name}
          </Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={14} color="grey" />
      </View>
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52
  }
})

export default MenuItem
