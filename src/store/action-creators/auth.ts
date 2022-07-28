import { INewspaper, ILearningMaterial } from './../../types/library'
import { Dispatch } from 'redux'
import { AuthAction, AuthActionTypes } from '../../types/redux/auth'
import api from '../../api'

export const login = (login: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      let resp = await api.post('/auth/login/', {
        username: login,
        password,
      })

      localStorage.setItem('access', resp.data.access_token)
      localStorage.setItem('refresh', resp.data.refresh_token)

      resp = await api.get('/auth/profile/')

      dispatch({
        type: AuthActionTypes.LOGIN,
        payload: {
          login,
          id: 1,
          role: resp.data.role,
          email: resp.data.email,

          favoriteNewspapers: resp.data.favourites_newspapers,
          favoriteLearningMaterials: resp.data.favourites_learning_materials,
          postsEdited: resp.data.pages_edited,

          firstName: resp.data.first_name,
          lastName: resp.data.last_name,
          patronymicName: resp.data.patronymic,
        },
      })
    } catch (e) {
      dispatch({
        type: AuthActionTypes.LOGIN,
        payload: {
          login: '',
          id: -1,
          role: 'Unanimous',
          email: '',

          favoriteNewspapers: [],
          favoriteLearningMaterials: [],
          postsEdited: 0,

          firstName: '',
          lastName: '',
          patronymicName: '',
        },
      })
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.LOGOUT,
      payload: null,
    })

    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }
}

export const checkNewspaperIsFavorite = (newspaper: INewspaper) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    // fetch

    await api.post('/library/toggle-newspaper-is-favorite/', {
      id: newspaper.id,
    })

    dispatch({
      type: AuthActionTypes.CHECK_NEWSPAPER_IS_FAVORITE,
      payload: newspaper,
    })
  }
}

export const checkLearningMaterialIsFavorite = (
  learningMaterial: ILearningMaterial
) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    // fetch
    await api.post('/library/toggle-learning-material-is-favorite/', {
      id: learningMaterial.id,
    })

    dispatch({
      type: AuthActionTypes.CHECK_LM_IS_FAVORITE,
      payload: learningMaterial,
    })
  }
}

export const changeInfo = (information: {
  firstName: string
  lastName: string
  patronymicName: string
  email: string
}) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    // fetch

    dispatch({
      type: AuthActionTypes.CHANGE_INFO,
      payload: information,
    })
  }
}
