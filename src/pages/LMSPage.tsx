import { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { NewspaperCard } from '../components/NewspaperCard/NewspaperCard'
import { useActions } from '../hooks/useActions'
import { useFormater } from '../hooks/useFormater/useFormater'
import { useTypedSelector } from '../hooks/useTypedSelector'
import reader from '../static/reader.svg'
import editor from '../static/editor.svg'
import api from '../api'

export const LMSPage: FC = () => {
  const {
    role,
    favorites,
    firstName,
    lastName,
    patronymicName,
    login,
    email,
    id,
  } = useTypedSelector(state => state.auth)
  const { checkIsFavorite, changeInfo, logout } = useActions()
  const navigate = useNavigate()
  const _ = useFormater()
  const [showChangeInfoModal, setShowChangeInfoModal] = useState<boolean>(false)
  const [infoFormData, setInfoFormData] = useState<{
    firstName: string
    lastName: string
    patronymicName: string
    email: string
  }>({
    firstName,
    lastName,
    patronymicName,
    email,
  })

  useEffect(() => {
    if (role === 'Unanimous') navigate('/lms/login/')
  }, [role])

  useEffect(() => {
    document.body.setAttribute('style', 'background: #E5E5E5')
    return () => document.body.removeAttribute('style')
  }, [])

  return (
    <>
      <Header />
      <Container style={{ marginTop: 90 }}>
        <Row>
          <Col md={4} sm={12}>
            <div className='information'>
              <h5>Информация об аккаунте</h5>
              <h6>
                Читатель
                <img src={reader} alt='reader' className='icon' />
              </h6>
              <Row className='white-scroll'>
                <Col md={4} sm={6}>
                  <div className='name'>Имя</div>
                  <div className='value'>{firstName}</div>
                </Col>
                <Col md={4} sm={6}>
                  <div className='name'>Фамилия</div>
                  <div className='value'>{lastName}</div>
                </Col>
                <Col md={4} sm={6}>
                  <div className='name'>Отчество</div>
                  <div className='value'>{patronymicName}</div>
                </Col>
              </Row>
              <Row className='white-scroll'>
                <Col sm={12}>
                  <div className='name'>Логин</div>
                  <div className='value'>{login}</div>
                </Col>
              </Row>
              <Row className='white-scroll'>
                <Col sm={12}>
                  <div className='name'>Email</div>
                  <div className='value'>{email}</div>
                </Col>
              </Row>
              {role === 'Editor' ? (
                <>
                  <h6>
                    Редактор
                    <img src={editor} alt='editor' className='icon' />
                  </h6>
                  <Row className='white-scroll'>
                    <Col sm={12}>
                      <div className='name'>ID</div>
                      <div className='value'>{id}</div>
                    </Col>
                  </Row>
                </>
              ) : null}
              <div className='actions'>
                <Link to='/'>На главную</Link>
                {role === 'Editor' ? (
                  <a
                    href='#'
                    target='_blank'
                    onClick={async e => {
                      e.preventDefault()
                      await api.post('/make-permissions/')

                      window.location.replace('/admin/api/page/')
                    }}
                  >
                    Редактировать выпуски
                  </a>
                ) : null}
                <a
                  href='#'
                  onClick={e => {
                    e.preventDefault()
                    setShowChangeInfoModal(true)
                  }}
                >
                  Изменить личную информацию
                </a>
                <a
                  href='#'
                  onClick={e => {
                    e.preventDefault()
                    logout()
                  }}
                >
                  Выйти из аккаунта
                </a>
              </div>
            </div>
          </Col>
          <Col md={8} sm={12}>
            <h4>Избранное</h4>
            <Row>
              {favorites.map(n => (
                <NewspaperCard
                  key={n.id}
                  id={n.id}
                  imageUrl={n.preview_image}
                  alt={n.name}
                  date={_(n.created_date)}
                  size={6}
                  link={`/archive/newspapers/${n.id}/`}
                  tags={n.tags}
                  tagsClassName='gray-scroll'
                  isFavorite={true}
                  favoriteClickHandler={() => checkIsFavorite(n)}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showChangeInfoModal}
        onHide={() => setShowChangeInfoModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Изменить личную информацию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3 inline-group'>
              <Form.Label htmlFor='name' className='mb-0 mr-4'>
                Имя
              </Form.Label>
              <Form.Control
                type='text'
                id='name'
                value={infoFormData.firstName}
                onChange={event =>
                  setInfoFormData(fd => ({
                    ...fd,
                    firstName: event.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3 inline-group'>
              <Form.Label htmlFor='lastName' className='mb-0 mr-4'>
                Фамилия
              </Form.Label>
              <Form.Control
                type='text'
                id='lastName'
                value={infoFormData.lastName}
                onChange={event =>
                  setInfoFormData(fd => ({
                    ...fd,
                    lastName: event.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className='mb-3 inline-group'>
              <Form.Label htmlFor='patronymicName' className='mb-0 mr-4'>
                Фамилия
              </Form.Label>
              <Form.Control
                type='text'
                id='patronymicName'
                value={infoFormData.patronymicName}
                onChange={event =>
                  setInfoFormData(fd => ({
                    ...fd,
                    patronymicName: event.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setShowChangeInfoModal(false)}
          >
            Отмена
          </Button>
          <Button
            variant='dark'
            onClick={() => {
              changeInfo(infoFormData)
              setShowChangeInfoModal(false)
            }}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
