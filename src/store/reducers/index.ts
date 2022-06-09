import { authReducer } from './auth'
import { libraryReducer } from './library'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  library: libraryReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
