import { authReducer } from './auth'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
