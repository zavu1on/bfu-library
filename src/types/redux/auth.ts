import { INewspaper } from './../library'
type Role = 'Unanimous' | 'Reader' | 'Editor' | 'Admin' | 'Superuser'

export interface IAuthState {
  id: number
  login: string
  email: string
  role: Role
  favorites: INewspaper[]

  firstName: string
  lastName: string
  patronymicName: string
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CHECK_IS_FAVORITE = 'CHECK_IS_FAVORITE',
  CHANGE_INFO = 'CHANGE_INFO',
}

export type AuthAction =
  | ILoginAction
  | ILogoutAction
  | ICheckIsFavoriteAction
  | IChangeInfoAction

interface ILoginAction {
  type: AuthActionTypes.LOGIN
  payload: IAuthState
}

interface ILogoutAction {
  type: AuthActionTypes.LOGOUT
  payload: null
}

interface ICheckIsFavoriteAction {
  type: AuthActionTypes.CHECK_IS_FAVORITE
  payload: INewspaper
}

interface IChangeInfoAction {
  type: AuthActionTypes.CHANGE_INFO
  payload: {
    firstName: string
    lastName: string
    patronymicName: string
    email: string
  }
}
