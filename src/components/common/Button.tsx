import TouchableScale, { TouchableScaleProps } from './TouchableScale.tsx'
import Text, { TextStyle } from './Text.tsx'

type ButtonProps = TouchableScaleProps & { text: string; textStyle?: TextStyle }

const Button = ({ text, textStyle, ...props }: ButtonProps) => {
  return (
    <TouchableScale
      {...props}
      containerStyle={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          padding: 10,
          borderRadius: 8,
          backgroundColor: 'rgb(125, 125, 255)',
          shadowColor: 'rgb(180, 180, 180)',
          shadowOffset: {
            width: 0,
            height: 0.3
          },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 3
        },
        props.style
      ]}>
      <Text
        style={{
          fontSize: 12,
          color: 'white',
          fontWeight: 'bold',
          ...textStyle
        }}>
        {text}
      </Text>
    </TouchableScale>
  )
}

export type { ButtonProps }
export default Button
