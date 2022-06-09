import { INewspaper } from './../library'
type Role = 'anonymous' | 'reader' | 'editor' | 'admin'

export interface IAuthState {
  id: number
  login: string
  email: string
  role: Role
  favorites: INewspaper[]
  postsEdited: number // for editor and admin

  firstName: string
  lastName: string
  patronymicName: string

  error: string | null
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CLEAR_ERROR = 'CLEAR_ERROR',
  CHECK_IS_FAVORITE = 'CHECK_IS_FAVORITE',
}

export type AuthAction =
  | ILoginAction
  | ILogoutAction
  | IClearErrorAction
  | ICheckIsFavoriteAction

interface ILoginAction {
  type: AuthActionTypes.LOGIN
  payload: IAuthState
}

interface ILogoutAction {
  type: AuthActionTypes.LOGOUT
  payload: null
}

interface IClearErrorAction {
  type: AuthActionTypes.CLEAR_ERROR
  payload: null
}

interface ICheckIsFavoriteAction {
  type: AuthActionTypes.CHECK_IS_FAVORITE
  payload: INewspaper
}
