import { Dispatch, SetStateAction, useCallback } from 'react'
import { View } from 'react-native'
import { FilterResponse } from '../../module/lecture/types/response'
import { SearchLecturePageRequest } from '../../module/lecture/types/request'
import { filterNames } from '../../screens/lecture/LectureListScreen.tsx'
import SelectionModal from '../common/SelectionModal.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import Text from '../common/Text.tsx'

interface Props {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  searchRequest: SearchLecturePageRequest
  setSearchRequest: Dispatch<SetStateAction<SearchLecturePageRequest>>
  filter: FilterResponse
  currentFilter: string
}

const FilterModal = ({ isVisible, setIsVisible, searchRequest, setSearchRequest, filter, currentFilter }: Props) => {
  const setFilterHandler = useCallback(
    (item: string | number) =>
      setSearchRequest(current => {
        current[currentFilter] = item

        return { ...current }
      }),
    [currentFilter, setIsVisible, setSearchRequest]
  )

  const resetHandler = useCallback(() => {
    setSearchRequest(current => {
      delete current[currentFilter]

      return { ...current }
    })
    setIsVisible(false)
  }, [currentFilter, setIsVisible, setSearchRequest])

  return (
    <SelectionModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      name={filterNames[currentFilter]}
      values={filter[currentFilter]}
      selectedValue={searchRequest[currentFilter]}
      selectHandler={setFilterHandler}
      ListHeaderComponent={() => (
        <TouchableScale activeOpacity={0.8} onPress={resetHandler}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 52,
              paddingHorizontal: 12
            }}>
            <Text>전체</Text>
          </View>
        </TouchableScale>
      )}
    />
  )
}

export default FilterModal
