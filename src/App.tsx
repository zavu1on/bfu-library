import { useEffect } from 'react'
import { useRouter } from './hooks/useRouter'

function App() {
  const routes = useRouter()

  useEffect(() => {
    // todo check token
    // todo try login
  }, [])

  return routes
}

export default App
