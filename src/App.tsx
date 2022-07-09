import { useEffect } from 'react'
import { useRouter } from './hooks/useRouter'
import { useDispatch } from 'react-redux'
import { AuthActionTypes } from './types/redux/auth'
import api from './api'

function App() {
  const routes = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!localStorage.getItem('access')) {
      api.get('/auth/profile/').then(resp => {
        dispatch({
          type: AuthActionTypes.LOGIN,
          payload: {
            login: resp.data.login,
            id: 1,
            role: resp.data.role,
            email: resp.data.email,

            favorites: resp.data.favourites_newspapers,
            postsEdited: resp.data.pages_edited,

            firstName: resp.data.first_name,
            lastName: resp.data.last_name,
            patronymicName: resp.data.patronymic,
          },
        })
      })
    }
  }, [])

  return routes
}

export default App
