import { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export const LoginPage: FC = () => {
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
              <Form.Control type='text' placeholder='Логин' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='password' placeholder='Пароль' />
            </Form.Group>
            <Button variant='dark' className='w-100'>
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}
