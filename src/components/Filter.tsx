import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { MaterialCommunityIcons, SimpleLineIcons } from '../lib/icon.ts'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import FilterModal from './FilterModal.tsx'
import { useDispatch } from 'react-redux'
import { setFilter } from '../redux/reducers/filterReducer.ts'
import { getFilter } from '../module/lecture/api.ts'
import { SearchLecturesRequest } from '../module/lecture/lecture'

interface Props {
  request: SearchLecturesRequest
  setRequest: Dispatch<SetStateAction<SearchLecturesRequest>>
}

const FilterButton = ({
  filterName,
  filterText,
  onPressHandler,
  request
}: {
  filterName: string
  filterText: string
  onPressHandler: (name: string) => void
  request: SearchLecturesRequest
}) => {
  return (
    <TouchableOpacity
      style={styles.filter}
      activeOpacity={0.8}
      onPress={() => onPressHandler(filterName)}>
      <Text style={styles.filterText}>
        {filterText}
        {request[filterName] && `: ${request[filterName]}`}
      </Text>
      <SimpleLineIcons name="arrow-down" size={8} />
    </TouchableOpacity>
  )
}

const Filter = ({ request, setRequest }: Props) => {
  const [filterModal, setFilterModal] = useState(false)
  const [filterName, setFilterName] = useState('')
  const dispatch = useDispatch()

  const onPressHandler = useCallback((name: string) => {
    setFilterName(name)
    setFilterModal(true)
  }, [])

  useEffect(() => {
    getFilter().then(response => {
      dispatch(setFilter(response))
    })
  }, [dispatch])

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <FilterButton
          filterName={'year'}
          filterText={'연도'}
          onPressHandler={onPressHandler}
          request={request}
        />
        <FilterButton
          filterName={'grade'}
          filterText={'학년'}
          onPressHandler={onPressHandler}
          request={request}
        />
        <FilterButton
          filterName={'semester'}
          filterText={'학기'}
          onPressHandler={onPressHandler}
          request={request}
        />
        <FilterButton
          filterName={'major'}
          filterText={'과'}
          onPressHandler={onPressHandler}
          request={request}
        />
        <FilterButton
          filterName={'credit'}
          filterText={'학점'}
          onPressHandler={onPressHandler}
          request={request}
        />
        <View style={styles.filter}>
          <MaterialCommunityIcons name="filter-variant-plus" size={12} />
          <Text style={styles.filterText}>기타</Text>
        </View>
      </ScrollView>
      <FilterModal
        isVisible={filterModal}
        setIsVisible={setFilterModal}
        request={request}
        setRequest={setRequest}
        filterName={filterName}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 32,
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginRight: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgb(230, 230, 230)',
    shadowColor: 'rgb(220, 220, 220)',
    shadowOffset: {
      width: 0.3,
      height: 0.3
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  },
  filterText: {
    fontSize: 12,
    marginRight: 1.5
  }
})

export default Filter
