import { FC, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { NewspaperCard } from '../components/NewspaperCard'
import { useActions } from '../hooks/useActions'
import { useFormater } from '../hooks/useFormater'
import { useTypedSelector } from '../hooks/useTypedSelector'
import reader from '../static/reader.svg'
import editor from '../static/editor.svg'

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
    postsEdited,
  } = useTypedSelector(state => state.auth)
  const { checkIsFavorite } = useActions()
  const navigate = useNavigate()
  const _ = useFormater()

  useEffect(() => {
    if (role === 'anonymous') navigate('/lms/login/')

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
              <h6>
                Редактор
                <img src={editor} alt='editor' className='icon' />
              </h6>
              <Row className='white-scroll'>
                <Col sm={6}>
                  <div className='name'>ID</div>
                  <div className='value'>{id}</div>
                </Col>
                <Col sm={6}>
                  <div className='name'>Всего отредактировано</div>
                  <div className='value'>{postsEdited}</div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={8} sm={12}>
            <h4>Избранное</h4>
            <Row>
              {favorites.map(n => (
                <NewspaperCard
                  key={n.id}
                  id={n.id}
                  imageUrl={n.previewImageUrl}
                  alt={n.name}
                  date={_(n.createdDate)}
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
    </>
  )
}
