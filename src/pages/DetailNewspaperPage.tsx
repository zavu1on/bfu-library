import { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { useActions } from '../hooks/useActions'
import { useFormater } from '../hooks/useFormater'
import { useTypedSelector } from '../hooks/useTypedSelector'
// @ts-ignore
import PrismaZoom from 'react-prismazoom'
import star from '../static/star-black.svg'
import starFill from '../static/star-fill-black.svg'
import { INewspaper, IPage } from '../types/library'
import { useQuery } from 'react-query'
import api from '../api'
import { AxiosResponse } from 'axios'

export const DetailNewspaperPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    isLoading: isNewspaperLoading,
    data: newspaper,
    failureCount,
  } = useQuery(
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

  useEffect(() => {
    if (!isNewspaperLoading && !newspaper?.data.id) navigate('/not-found/')
  }, [])
  useEffect(() => {
    if (!isNewspaperLoading && !newspaper?.data.id) navigate('/not-found/')

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
  useEffect(() => {
    if (failureCount > 0 && !newspaper?.data.id) {
      navigate('/not-found/')
    }
  }, [failureCount, newspaper])

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
          <div className='navigation-btn-container'>
            <Button
              variant='dark'
              size='sm'
              onClick={() => navigate(`/archive/newspapers/${Number(id) - 1}/`)}
            >
              {'<'}
            </Button>
            <Button
              variant='dark'
              size='sm'
              style={{
                marginLeft: 24,
              }}
              onClick={() => navigate(`/archive/newspapers/${Number(id) + 1}/`)}
            >
              {'>'}
            </Button>
          </div>
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
          Пожалуйста, сообщите об ошибке Саенко Ангелине Вячеславовне по почте{' '}
          <a href='mailto:AVSaenko1@kantiana.ru'>AVSaenko1@kantiana.ru</a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
