import { StyleSheet, Text, View } from 'react-native'
import { SimpleLineIcons } from '../lib/icon.ts'
import { SearchLecturesRequest } from '../module/lecture/dto/request'
import { filterNames } from '../screens/lecture/LectureListScreen.tsx'

interface Props {
  filter: string
  request: SearchLecturesRequest
}

const FilterItem = ({ filter, request }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'NanumSquare_acR'
        }}>
        {filterNames[filter]}
        {request[filter] != null && `: ${request[filter]}`}
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

export default FilterItem
