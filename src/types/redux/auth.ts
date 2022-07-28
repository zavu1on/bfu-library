import { INewspaper, ILearningMaterial } from './../library'
type Role = 'Unanimous' | 'Reader' | 'Editor' | 'Admin' | 'Superuser'

export interface IAuthState {
  id: number
  login: string
  email: string
  role: Role
  favoriteNewspapers: INewspaper[]
  favoriteLearningMaterials: ILearningMaterial[]

  firstName: string
  lastName: string
  patronymicName: string
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CHECK_NEWSPAPER_IS_FAVORITE = 'CHECK_NEWSPAPER_IS_FAVORITE',
  CHECK_LM_IS_FAVORITE = 'CHECK_LM_IS_FAVORITE',
  CHANGE_INFO = 'CHANGE_INFO',
}

export type AuthAction =
  | ILoginAction
  | ILogoutAction
  | ICheckNewspaperIsFavoriteAction
  | IChangeInfoAction
  | ICheckLMIsFavoriteAction

interface ILoginAction {
  type: AuthActionTypes.LOGIN
  payload: IAuthState
}

interface ILogoutAction {
  type: AuthActionTypes.LOGOUT
  payload: null
}

interface ICheckNewspaperIsFavoriteAction {
  type: AuthActionTypes.CHECK_NEWSPAPER_IS_FAVORITE
  payload: INewspaper
}

interface ICheckLMIsFavoriteAction {
  type: AuthActionTypes.CHECK_LM_IS_FAVORITE
  payload: ILearningMaterial
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
