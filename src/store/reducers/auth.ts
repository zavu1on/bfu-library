import {
  IAuthState,
  AuthAction,
  AuthActionTypes,
} from './../../types/redux/auth'

const initialState: IAuthState = {
  id: -1,
  login: '',
  email: '',
  role: 'anonymous',
  favorites: [],
  postsEdited: 0,

  firstName: '',
  lastName: '',
  patronymicName: '',
}

export const authReducer = (
  state = initialState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, ...action.payload }
    case AuthActionTypes.LOGOUT:
      return {
        id: -1,
        login: '',
        email: '',
        role: 'anonymous',
        favorites: [],
        postsEdited: 0,

        firstName: '',
        lastName: '',
        patronymicName: '',
      }
    default:
      return state
  }
}
