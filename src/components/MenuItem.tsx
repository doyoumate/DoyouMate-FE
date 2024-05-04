import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '../lib/icon.ts'
import { ReactNode } from 'react'

interface Props {
  name: string
  icon: ReactNode
  onPressHandler?: (event: GestureResponderEvent) => void
}

const MenuItem = ({ name, icon, onPressHandler }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressHandler} activeOpacity={0.8}>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        {icon}
        <Text style={{ fontSize: 13, fontFamily: 'NanumSquare_acB' }}>{name}</Text>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={14} color="grey" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 52
  }
})

export default MenuItem
