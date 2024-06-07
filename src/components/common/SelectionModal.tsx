import { FlatList, FlatListProps, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Feather } from '../../lib/icon/icons.ts'
import Modal, { ModalProps, ModalStates } from './Modal.tsx'
import { Dispatch, SetStateAction } from 'react'
import Text from './Text.tsx'

type SelectionModalProps<T> = {
  name: string
  values: T[]
  selectedValue?: T
  textMapper?: (value: T) => string
  selectHandler: (value: T) => void | Dispatch<SetStateAction<T | undefined>> | Dispatch<SetStateAction<T>>
  onSelect?: () => void
} & ModalStates &
  Omit<FlatListProps<T>, 'data' | 'renderItem'> &
  Omit<ModalProps, 'children'>

const SelectionModal = <T extends any>({
  isVisible,
  setIsVisible,
  name,
  values,
  selectedValue,
  textMapper,
  selectHandler,
  onSelect,
  ...props
}: SelectionModalProps<T>) => {
  return (
    <Modal
      style={{ justifyContent: 'flex-end' }}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      containerStyle={styles.container}
      {...props}>
      <Text
        style={{
          marginVertical: 15,
          fontWeight: 'bold'
        }}>
        {name}
      </Text>
      <FlatList
        style={{ width: '100%' }}
        data={values}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.8}
            onPress={() => {
              selectHandler(item)
              setIsVisible(false)
              if (onSelect) onSelect()
            }}>
            <View style={styles.value}>
              <Text
                style={
                  JSON.stringify(item) === JSON.stringify(selectedValue)
                    ? {
                        fontWeight: 'bold',
                        color: 'rgb(95, 135, 250)'
                      }
                    : {
                        fontWeight: 'normal'
                      }
                }>
                {textMapper ? textMapper(item) : (item as string)}
              </Text>
              {JSON.stringify(item) === JSON.stringify(selectedValue) && (
                <Feather style={{ paddingRight: 10 }} name="check" size={16} color="rgb(95, 135, 250)" />
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => (textMapper ? textMapper(item) : (item as string))}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 330,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white'
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 12
  }
})

export type { SelectionModalProps }
export default SelectionModal
