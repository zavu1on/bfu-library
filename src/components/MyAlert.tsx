import { FC, CSSProperties } from 'react'
import { Alert } from 'react-bootstrap'

type AlertVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

interface IProps {
  show: boolean
  setShow: Function
  variant: AlertVariant
  header: string
  text: string
  style?: CSSProperties
}

export const MyAlert: FC<IProps> = ({
  show,
  setShow,
  variant,
  header,
  text,
  style,
}) => {
  return (
    <Alert
      show={show}
      variant={variant}
      onClose={() => setShow(false)}
      dismissible
      style={style}
    >
      <Alert.Heading>{header}</Alert.Heading>
      <span>{text}</span>
    </Alert>
  )
}
