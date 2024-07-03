import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../common/Text.tsx'

interface Props {
  name?: string
}

const TagItem = ({ name }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'normal'
        }}>
        {name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgb(235, 235, 235)',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  }
})

export default TagItem
