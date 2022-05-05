import { libraryReducer } from './library'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  library: libraryReducer,
})

export type RootState = ReturnType<typeof rootReducer>
