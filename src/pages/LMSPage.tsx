import { FC, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const LMSPage: FC = () => {
  const { role } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (role === 'anonymous') navigate('/lms/login/')
  }, [])

  return (
    <>
      <Header />
      <Container>LMS Page</Container>
    </>
  )
}
