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
  closeHandler: any
  variant: AlertVariant
  header: string
  text: string
  style?: CSSProperties
}

export const MyAlert: FC<IProps> = ({
  show,
  closeHandler,
  variant,
  header,
  text,
  style,
}) => {
  return (
    <Alert
      show={show}
      variant={variant}
      onClose={closeHandler}
      dismissible
      style={style}
    >
      <Alert.Heading>{header}</Alert.Heading>
      <span>{text}</span>
    </Alert>
  )
}
