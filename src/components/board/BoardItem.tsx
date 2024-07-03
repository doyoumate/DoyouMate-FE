import { StyleSheet } from 'react-native'
import { BoardResponse } from '../../module/board/types/response'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { AnimatedText, AnimatedView } from '../common/Animated.tsx'

interface Props {
  board: BoardResponse
  selected: boolean
}

const BoardItem = ({ board, selected }: Props) => {
  const selectedTextStyle = useAnimatedStyle(
    () => ({
      color: withTiming(selected ? 'white' : 'rgb(120, 120, 120)', {
        duration: 150
      })
    }),
    [selected]
  )
  const selectedContainerStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(selected ? 'rgb(180, 180, 255)' : 'rgb(235, 235, 235)', {
        duration: 150
      })
    }),
    [selected]
  )

  return (
    <AnimatedView style={[styles.container, selectedContainerStyle]}>
      <AnimatedText
        style={[
          {
            fontSize: 12,
            fontWeight: 'normal'
          },
          selectedTextStyle
        ]}>
        {board.name}
      </AnimatedText>
    </AnimatedView>
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
    shadowColor: 'rgb(235, 235, 235)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5
  }
})

export default BoardItem
