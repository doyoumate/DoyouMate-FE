import { StyleSheet, View } from 'react-native'
import { SimpleLineIcons } from '../../lib/icon/icons.ts'
import { SearchLecturePageRequest } from '../../module/lecture/types/request'
import { filterNames } from '../../screens/lecture/LectureListScreen.tsx'
import Text from '../common/Text.tsx'

interface Props {
  filter: string
  searchRequest: SearchLecturePageRequest
}

const FilterItem = ({ filter, searchRequest }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'normal',
          color: 'rgb(50, 50, 50)'
        }}>
        {filterNames[filter]}
        {searchRequest[filter] != null && `: ${searchRequest[filter]}`}
      </Text>
      <SimpleLineIcons name="arrow-down" size={8} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginRight: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgb(235, 235, 235)',
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

export default FilterItem
