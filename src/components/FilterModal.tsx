import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import Modal from 'react-native-modal'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SearchLecturesRequest } from '../module/lecture/lecture'
import { shallowEqual, useSelector } from 'react-redux'
import { Feather } from '../lib/icon.ts'

interface Props {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  request: SearchLecturesRequest
  setRequest: Dispatch<SetStateAction<SearchLecturesRequest>>
  filterName: string
}

const FilterModal = ({
  isVisible,
  setIsVisible,
  request,
  setRequest,
  filterName
}: Props) => {
  const filter = useSelector((store: Store) => store.filter, shallowEqual)

  const filterNames: { [key: string]: string } = useMemo(
    () => ({
      year: '연도',
      grade: '학년',
      semester: '학기',
      major: '전공',
      credit: '학점',
      section: '영역'
    }),
    []
  )

  const onPressHandler = useCallback(
    (item: string | number) => {
      setRequest(current => {
        current[filterName] = item

        return { ...current }
      })
      setIsVisible(false)
    },
    [filterName, setIsVisible, setRequest]
  )

  const resetHandler = useCallback(() => {
    setRequest(current => {
      delete current[filterName]

      return { ...current }
    })
    setIsVisible(false)
  }, [filterName, setIsVisible, setRequest])

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={() => {
        setIsVisible(false)
      }}
      onBackdropPress={() => {
        setIsVisible(false)
      }}
      backdropOpacity={0.4}
      animationInTiming={500}
      animationOutTiming={500}
      style={styles.modal}
      useNativeDriver
      hideModalContentWhileAnimating>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{filterNames[filterName]}</Text>
        </View>
        <FlatList
          style={styles.list}
          data={filter[filterName]}
          ListHeaderComponent={
            <TouchableOpacity onPress={resetHandler}>
              <View style={styles.filter}>
                <Text style={styles.filterText}>전체</Text>
              </View>
            </TouchableOpacity>
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressHandler(item)}>
              {item === request[filterName] ? (
                <View style={[styles.filter, styles.selectedFilter]}>
                  <Text style={[styles.filterText, styles.selectedFilterText]}>
                    {item}
                  </Text>
                  <Feather
                    name="check"
                    size={15}
                    style={styles.selectedFilterText}
                  />
                </View>
              ) : (
                <View style={styles.filter}>
                  <Text style={styles.filterText}>{item}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.toString()}
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
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white'
  },
  title: { marginVertical: 15 },
  titleText: { fontWeight: 'bold' },
  list: { width: '100%' },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 12
  },
  filterText: {},
  selectedFilter: {
    paddingRight: 20
  },
  selectedFilterText: {
    color: 'rgb(80, 120, 255)'
  }
})

export default FilterModal
