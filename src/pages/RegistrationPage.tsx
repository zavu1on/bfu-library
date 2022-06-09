import { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export const RegistrationPage: FC = () => {
  return (
    <>
      <Header />
      <div className='full'>
        <div className='form-container'>
          <div className='form-type'>
            <Link to={'/lms/login/'}>Вход</Link>
            <Link to={'/lms/register/'} className='type-active'>
              Регистрация
            </Link>
          </div>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='Фамилия' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='Имя' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='Отчество' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='email' placeholder='Email' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='Логин' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='password' placeholder='Пароль' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='password' placeholder='Повторите пароль' />
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
