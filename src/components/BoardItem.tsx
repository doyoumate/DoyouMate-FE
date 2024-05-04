import { StyleSheet, View } from 'react-native'
import { BoardResponse } from '../module/board/dto/response'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface Props {
  board: BoardResponse
  selected: boolean
}

const BoardItem = ({ board, selected }: Props) => {
  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(selected ? 'black' : 'grey', {
        duration: 300
      })
    }
  })

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          {
            fontSize: 12,
            fontFamily: 'NanumSquare_acR'
          },
          textStyle
        ]}>
        {board.name}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginRight: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgb(230, 230, 230)',
    shadowColor: 'rgb(230, 230, 230)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  }
})

export default BoardItem
