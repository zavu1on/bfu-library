import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <Container>
        <h1>404 Not Found</h1>
        <Link to={'/'}>Home</Link>
      </Container>
    </>
  )
}
