import RNModal, { ModalProps as RNModalProps } from 'react-native-modal'
import { RequiredFields } from '../../lib/types/util'
import { Dispatch, SetStateAction } from 'react'
import { SafeAreaView, StyleProp, View, ViewStyle } from 'react-native'

type ModalProps = RequiredFields<Partial<RNModalProps>, 'children'> &
  ModalStates & {
    containerStyle?: StyleProp<ViewStyle>
    useSafeArea?: boolean
  }

interface ModalStates {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ isVisible, setIsVisible, containerStyle, useSafeArea = false, ...props }: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      avoidKeyboard
      {...props}
      onBackdropPress={() => {
        if (props.onBackdropPress) props.onBackdropPress()
        setIsVisible(false)
      }}
      style={[props.style, { margin: 0 }]}>
      {useSafeArea ? (
        <SafeAreaView style={containerStyle} children={props.children} />
      ) : (
        <View style={containerStyle} children={props.children} />
      )}
    </RNModal>
  )
}

export type { ModalProps, ModalStates }
export default Modal
