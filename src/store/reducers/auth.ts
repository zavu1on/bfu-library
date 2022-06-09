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

  error: null,
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

        error: null,
      }
    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    case AuthActionTypes.CHECK_IS_FAVORITE:
      if (!!state.favorites.find(f => f.id === action.payload.id))
        return {
          ...state,
          favorites: state.favorites.filter(f => f.id !== action.payload.id),
        }

      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    default:
      return state
  }
}
