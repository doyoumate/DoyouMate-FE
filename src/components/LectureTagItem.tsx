import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
  name: string
  value?: string
}

const LectureTagItem = ({ name, value }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'NanumSquare_acL'
        }}>
        {name}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'NanumSquare_acR',
          letterSpacing: -0.5
        }}>
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 1,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(240, 240, 240)',
    shadowColor: 'rgb(240, 240, 240)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  }
})

export default LectureTagItem
