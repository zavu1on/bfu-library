import { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { useActions } from '../hooks/useActions'
import { useFormater } from '../hooks/useFormater'
import { useTypedSelector } from '../hooks/useTypedSelector'
// @ts-ignore
import PrismaZoom from 'react-prismazoom'
import { MyAlert } from '../components/MyAlert'

export const DetailNewspaperPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoading, newspapers } = useTypedSelector(state => state.library)
  const { fetchLibrary } = useActions()
  const _ = useFormater()
  const newspaper = newspapers.find(n => n.id === Number(id))
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  useEffect(() => {
    if (!newspapers.length) fetchLibrary()
    if (!isLoading && !newspaper) navigate('/not-found/')
  }, [])

  useEffect(() => {
    if (!isLoading && !newspaper) navigate('/not-found/')

    if (!isLoading) {
      setTimeout(() => {
        document.querySelectorAll('.img-container img').forEach(img => {
          const textContainer = document.querySelector(
            `#text-${img.id}`
          ) as HTMLParagraphElement

          // @ts-ignore
          textContainer.style.maxHeight = `${img.naturalHeight}px`
        })
      }, 100)
    }
  }, [isLoading])

  const handleCloseModal = () => setShowModal(false)

  const handleShowModal = () => setShowModal(true)

  if (isLoading) return <Loader />

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
          <span
            style={{
              color: '#343A40',
            }}
          >
            Архив
          </span>{' '}
          / {newspaper?.publisher.name} / {_(newspaper?.createdDate!)}
        </div>

        <MyAlert
          show={showAlert}
          setShow={setShowAlert}
          variant='success'
          header='Спасибо!'
          text='Вы успешно отправили отчёт, наши редакторы скоро исправят эту ошибку.'
          style={{
            position: 'relative',
            top: 20,
          }}
        />

        {newspaper?.pages.map((p, idx) => (
          <Row
            key={idx}
            className='page-container'
            style={idx === 0 ? { marginTop: 48 } : {}}
          >
            <Col md={1}>
              <div className='idx-container'>
                <div className='idx'>
                  <span>{idx + 1}</span>
                </div>
              </div>
            </Col>
            <Col md={5} className='img-container'>
              <PrismaZoom allowTouchEvents={true}>
                <img src={p.imageUrl} alt='page image' id={idx.toString()} />
              </PrismaZoom>
            </Col>
            <Col
              md={6}
              className='text-container white-scroll'
              id={`text-${idx}`}
            >
              <p dangerouslySetInnerHTML={{ __html: p.text }}></p>
            </Col>
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
