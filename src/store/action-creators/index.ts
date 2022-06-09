import * as LibraryActionCreators from './library'
import * as AuthActionCreators from './auth'

export default {
  ...LibraryActionCreators,
  ...AuthActionCreators,
}
