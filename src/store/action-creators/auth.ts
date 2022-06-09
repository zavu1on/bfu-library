import { Dispatch } from 'redux'
import { AuthAction, AuthActionTypes } from '../../types/redux/auth'

export const login = (login: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    // fetch
    // get tokens
    // try {...} catch (e) {...}

    dispatch({
      type: AuthActionTypes.LOGIN,
      payload: {
        login,
        id: 1,
        role: 'reader',
        email: 'test@mail.ru',

        favorites: [],
        postsEdited: 0,

        firstName: 'Михаил',
        lastName: 'Алексеев',
        patronymicName: 'Михайлович',
      },
    })

    localStorage.setItem('access-token', 'access-token')
    localStorage.setItem('refresh-token', 'refresh-token')
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.LOGOUT,
      payload: null,
    })

    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
  }
}
