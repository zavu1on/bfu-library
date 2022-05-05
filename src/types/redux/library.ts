import { INewspaper, IPublisher } from './../library'

export interface ILibraryState {
  newspapers: INewspaper[]
  publishers: IPublisher[]
  tags: string[]
  categories: string[]

  isLoading: boolean
}

export enum LibraryActionTypes {
  FETCH_LIBRARY = 'FETCH_LIBRARY',
  SET_LOADING_STATUS = 'SET_LOADING_STATUS',
}

export type LibraryAction = IFetchLibraryAction | ISetLoadingStatusAction

interface IFetchLibraryAction {
  type: LibraryActionTypes.FETCH_LIBRARY
  payload: {
    newspapers: INewspaper[]
    publishers: IPublisher[]
    tags: string[]
    categories: string[]
  }
}

interface ISetLoadingStatusAction {
  type: LibraryActionTypes.SET_LOADING_STATUS
  payload: boolean
}
