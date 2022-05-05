import {
  ILibraryState,
  LibraryAction,
  LibraryActionTypes,
} from '../../types/redux/library'

const initialState: ILibraryState = {
  publishers: [],
  newspapers: [],
  tags: [],
  categories: [],
  isLoading: true,
}

export const libraryReducer = (
  state = initialState,
  action: LibraryAction
): ILibraryState => {
  switch (action.type) {
    case LibraryActionTypes.FETCH_LIBRARY:
      return {
        ...state,
        ...action.payload,
      }
    case LibraryActionTypes.SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}
