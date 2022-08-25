import { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { useActions } from '../hooks/useActions'
import { useFormater } from '../hooks/useFormater/useFormater'
import { useTypedSelector } from '../hooks/useTypedSelector'
// @ts-ignore
import PrismaZoom from 'react-prismazoom'
import { MyAlert } from '../components/MyAlert'
import star from '../static/star-black.svg'
import starFill from '../static/star-fill-black.svg'
import { INewspaper, IPage } from '../types/library'
import { useQuery } from 'react-query'
import api from '../api'
import { AxiosResponse } from 'axios'

export const DetailNewspaperPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoading: isNewspaperLoading, data: newspaper } = useQuery(
    ['newspaper', id],
    async (): Promise<AxiosResponse<INewspaper>> => {
      return await api.get(`/library/newspapers/get/${id}/`)
    }
  )
  const { isLoading: isPagesLoading, data: pages } = useQuery(
    ['pages', id],
    async (): Promise<AxiosResponse<IPage[]>> => {
      return await api.get(`/library/pages/all/${id}/`)
    }
  )
  const { role, favoriteNewspapers } = useTypedSelector(state => state.auth)
  const { checkNewspaperIsFavorite } = useActions()
  const _ = useFormater()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  useEffect(() => {
    if (!isNewspaperLoading && !newspaper?.data) navigate('/not-found/')
  }, [])

  useEffect(() => {
    if (!isNewspaperLoading && !newspaper?.data) navigate('/not-found/')

    if (!isNewspaperLoading && newspaper?.data.is_published) {
      const interval = setInterval(() => {
        const images = document.querySelectorAll('.img-container img')

        images.forEach(img => {
          const textContainer = document.querySelector(
            `#text-${img.id}`
          ) as HTMLParagraphElement

          textContainer.style.maxHeight = `${img.clientHeight}px`
        })

        if (images.length) {
          clearInterval(interval)
        }
      }, 100)
    }
  }, [isNewspaperLoading])

  const handleCloseModal = () => setShowModal(false)

  const handleShowModal = async () => {
    if (role === 'Editor') {
      await api.post('/make-permissions/')

      window.location.replace(`/admin/api/page/${id}/`)
    }

    setShowModal(true)
  }

  if (isNewspaperLoading || isPagesLoading) return <Loader />

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            marginTop: 12,
            fontSize: 16,
            color: '#6C757D',
          }}
        >
          Архив / {newspaper?.data?.publisher.name} /{' '}
          {_(newspaper?.data?.created_date!)}
        </div>

        <MyAlert
          show={showAlert}
          closeHandler={() => setShowAlert(false)}
          variant='success'
          header='Спасибо!'
          text='Вы успешно отправили отчёт, наши редакторы скоро исправят эту ошибку.'
          style={{
            position: 'relative',
            top: 20,
          }}
        />

        <h4 style={{ marginTop: 70 }}>
          {newspaper?.data?.publisher.name}, {_(newspaper?.data?.created_date!)}{' '}
          {role !== 'Unanimous' ? (
            <button
              className='star'
              style={{
                position: 'relative',
                right: 0,
                bottom: 2,
              }}
              onClick={() => checkNewspaperIsFavorite(newspaper!.data)}
            >
              <img
                src={
                  !!favoriteNewspapers.find(f => f.id === newspaper?.data?.id)
                    ? starFill
                    : star
                }
                alt='star'
                style={{
                  fill: 'black',
                }}
              />
            </button>
          ) : null}
        </h4>
        {pages?.data.map((p, idx) => (
          <Row
            key={idx}
            className='page-container'
            style={idx === 0 ? { marginTop: 48 } : {}}
          >
            <Col md={newspaper?.data.is_published ? 1 : 2}>
              <div className='idx-container'>
                <div className='idx'>
                  <span>{idx + 1}</span>
                </div>
              </div>
            </Col>
            <Col
              md={newspaper?.data.is_published ? 5 : 8}
              className='img-container'
            >
              <PrismaZoom allowTouchEvents={true}>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  src={p.image}
                  alt='page image'
                  id={idx.toString()}
                />
              </PrismaZoom>
            </Col>
            {newspaper?.data.is_published ? (
              <Col
                md={6}
                className='text-container white-scroll'
                id={`text-${idx}`}
              >
                <p dangerouslySetInnerHTML={{ __html: p.text }}></p>
              </Col>
            ) : null}
          </Row>
        ))}
        <Button
          variant='outline-secondary'
          style={{ float: 'right', marginTop: 24 }}
          onClick={handleShowModal}
        >
          Сообщить об ошибке
        </Button>
        <div style={{ height: 100 }}></div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Отчёт об ошибке</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3 inline-group'>
              <Form.Label htmlFor='page-num' className='mb-0 mr-4'>
                Номер страницы
              </Form.Label>
              <Form.Control type='number' id='page-num' style={{ width: 60 }} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='comment' className='mb-0 mr-4'>
                Комментарий
              </Form.Label>
              <Form.Control id='comment' type='text' as='textarea' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Отмена
          </Button>
          <Button
            variant='dark'
            onClick={() => {
              handleCloseModal()
              setShowAlert(true)
            }}
          >
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
