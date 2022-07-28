import {
  IAuthState,
  AuthAction,
  AuthActionTypes,
} from './../../types/redux/auth'

const initialState: IAuthState = {
  id: -1,
  login: '',
  email: '',
  role: 'Unanimous',
  favoriteNewspapers: [],
  favoriteLearningMaterials: [],

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
        role: 'Unanimous',
        favoriteNewspapers: [],
        favoriteLearningMaterials: [],

        firstName: '',
        lastName: '',
        patronymicName: '',
      }
    case AuthActionTypes.CHECK_NEWSPAPER_IS_FAVORITE:
      if (!!state.favoriteNewspapers.find(f => f.id === action.payload.id))
        return {
          ...state,
          favoriteNewspapers: state.favoriteNewspapers.filter(
            f => f.id !== action.payload.id
          ),
        }

      return {
        ...state,
        favoriteNewspapers: [...state.favoriteNewspapers, action.payload],
      }
    case AuthActionTypes.CHECK_LM_IS_FAVORITE:
      if (
        !!state.favoriteLearningMaterials.find(f => f.id === action.payload.id)
      )
        return {
          ...state,
          favoriteLearningMaterials: state.favoriteLearningMaterials.filter(
            f => f.id !== action.payload.id
          ),
        }

      return {
        ...state,
        favoriteLearningMaterials: [
          ...state.favoriteLearningMaterials,
          action.payload,
        ],
      }
    case AuthActionTypes.CHANGE_INFO:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
