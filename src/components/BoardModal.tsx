import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dispatch, SetStateAction, useCallback } from 'react'
import Modal from 'react-native-modal'
import { Feather } from '../lib/icon.ts'
import { BoardResponse } from '../module/board/dto/response'

interface Props {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  boards: BoardResponse[]
  board: BoardResponse | undefined
  setBoard: Dispatch<SetStateAction<BoardResponse | undefined>>
}

const BoardModal = ({ isVisible, setIsVisible, boards, board, setBoard }: Props) => {
  const setBoardHandler = useCallback(
    (item: BoardResponse) => {
      setBoard(item)
      setIsVisible(false)
    },
    [setBoard, setIsVisible]
  )

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      backdropOpacity={0.2}
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}>
      <View style={styles.container}>
        <Text
          style={{
            marginVertical: 15,
            fontFamily: 'NanumSquare_acB'
          }}>
          게시판
        </Text>
        <FlatList
          style={{ width: '100%' }}
          data={boards}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setBoardHandler(item)}>
              <View>
                {item === board ? (
                  <View style={[styles.filters, styles.selectedFilter]}>
                    <Text
                      style={{
                        fontFamily: 'NanumSquare_acB',
                        color: 'rgb(95, 135, 250)'
                      }}>
                      {item.name} 게시판
                    </Text>
                    <Feather name="check" size={16} color="rgb(95, 135, 250)" />
                  </View>
                ) : (
                  <View style={styles.filters}>
                    <Text style={{ fontFamily: 'NanumSquare_acR' }}>{item.name} 게시판</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  container: {
    alignItems: 'center',
    height: 330,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 12
  },
  selectedFilter: {
    paddingRight: 20
  }
})

export default BoardModal
