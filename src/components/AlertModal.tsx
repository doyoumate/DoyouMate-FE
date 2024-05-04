import Modal from 'react-native-modal'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../redux/reducers/alertReducer.tsx'

const AlertModal = () => {
  const { modal, message } = useSelector((store: Store) => store.alert)
  const dispatch = useDispatch()

  return (
    <Modal
      style={styles.modal}
      isVisible={modal}
      backdropOpacity={0.2}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={150}
      animationOutTiming={150}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      onBackButtonPress={() => dispatch(closeModal())}
      onBackdropPress={() => dispatch(closeModal())}>
      <View style={styles.container}>
        <Text>{message}</Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  container: {
    alignItems: 'center',
    width: '80%',
    height: 130,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  }
})

export default AlertModal
