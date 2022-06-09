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
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthAction = ILoginAction | ILogoutAction

interface ILoginAction {
  type: AuthActionTypes.LOGIN
  payload: IAuthState
}

interface ILogoutAction {
  type: AuthActionTypes.LOGOUT
  payload: null
}
