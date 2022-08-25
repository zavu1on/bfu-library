import { FC, useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Swal from 'sweetalert2'
import api from '../api'

export const RegistrationPage: FC = () => {
  const [formData, setFormData] = useState<{
    login: string
    password1: string
    password2: string
    email: string
    firstName: string
    lastName: string
    patronymic: string
  }>({
    login: '',
    password1: '',
    password2: '',
    email: '',
    firstName: '',
    lastName: '',
    patronymic: '',
  })

  const { login } = useActions()
  const { role } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== 'Unanimous') navigate('/lms/')
  }, [role])

  const registerClickHandler = async () => {
    if (formData.password1 !== formData.password2) {
      return await Swal.fire({
        icon: 'error',
        title: 'Уупс...',
        text: `Пароли не совпадают!`,
      })
    }

    await api.post('/auth/registration/', {
      username: formData.login,
      password: formData.password1,
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      patronymic: formData.patronymic,
    })

    login(formData.login, formData.password1)
  }

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
              <Form.Control
                type='text'
                placeholder='Фамилия'
                value={formData.lastName}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Имя'
                value={formData.firstName}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Отчество'
                value={formData.patronymic}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    patronymic: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Логин'
                value={formData.login}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    login: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='password'
                placeholder='Пароль'
                value={formData.password1}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    password1: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='password'
                placeholder='Повторите пароль'
                value={formData.password2}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    password2: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Button
              variant='dark'
              className='w-100'
              onClick={registerClickHandler}
            >
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}
