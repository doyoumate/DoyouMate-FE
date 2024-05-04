import { Dispatch, SetStateAction, useCallback } from 'react'
import Modal from 'react-native-modal'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FilterResponse } from '../module/lecture/dto/response'
import { Feather } from '../lib/icon.ts'
import { SearchLecturesRequest } from '../module/lecture/dto/request'
import { filterNames } from '../screens/lecture/LectureListScreen.tsx'

interface Props {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  request: SearchLecturesRequest
  setRequest: Dispatch<SetStateAction<SearchLecturesRequest>>
  filter: FilterResponse
  currentFilter: string
}

const FilterModal = ({ isVisible, setIsVisible, request, setRequest, filter, currentFilter }: Props) => {
  const setFilterHandler = useCallback(
    (item: string | number) => {
      setRequest(current => {
        current[currentFilter] = item

        return { ...current }
      })
      setIsVisible(false)
    },
    [currentFilter, setIsVisible, setRequest]
  )

  const resetHandler = useCallback(() => {
    setRequest(current => {
      delete current[currentFilter]

      return { ...current }
    })
    setIsVisible(false)
  }, [currentFilter, setIsVisible, setRequest])

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      backdropOpacity={0.2}
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      propagateSwipe
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      onSwipeComplete={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}>
      <View style={styles.container}>
        <Text
          style={{
            marginVertical: 15,
            fontFamily: 'NanumSquare_acB'
          }}>
          {filterNames[currentFilter]}
        </Text>
        <FlatList
          style={{ width: '100%' }}
          data={filter[currentFilter]}
          ListHeaderComponent={
            <View onStartShouldSetResponder={() => true}>
              <TouchableOpacity activeOpacity={0.8} onPress={resetHandler}>
                <View style={styles.filters}>
                  <Text
                    style={{
                      fontFamily: 'NanumSquare_acR'
                    }}>
                    전체
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => (
            <View onStartShouldSetResponder={() => true}>
              <TouchableOpacity onPress={() => setFilterHandler(item)}>
                <View>
                  {item === request[currentFilter] ? (
                    <View style={[styles.filters, styles.selectedFilter]}>
                      <Text
                        style={{
                          fontFamily: 'NanumSquare_acB',
                          color: 'rgb(95, 135, 250)'
                        }}>
                        {item}
                      </Text>
                      <Feather name="check" size={16} color="rgb(95, 135, 250)" />
                    </View>
                  ) : (
                    <View style={styles.filters}>
                      <Text style={{ fontFamily: 'NanumSquare_acR' }}>{item}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => String(item)}
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

export default FilterModal
