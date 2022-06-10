import { FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const LoginPage: FC = () => {
  const [formData, setFormData] = useState<{
    login: string
    password: string
  }>({
    login: '',
    password: '',
  })
  const { login } = useActions()
  const { role } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== 'anonymous') navigate('/lms/')
  }, [role])

  return (
    <>
      <Header />
      <div className='full'>
        <div className='form-container'>
          <div className='form-type'>
            <Link to={'/lms/login/'} className='type-active'>
              Вход
            </Link>
            <Link to={'/lms/register/'}>Регистрация</Link>
          </div>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Логин'
                value={formData.login}
                onChange={event =>
                  setFormData(fd => ({
                    ...fd,
                    login: event.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='password'
                placeholder='Пароль'
                value={formData.password}
                onChange={event =>
                  setFormData(fd => ({
                    ...fd,
                    password: event.target.value,
                  }))
                }
              />
            </Form.Group>
            <Button
              variant='dark'
              className='w-100'
              onClick={() => {
                login(formData.login, formData.password)
              }}
            >
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}
