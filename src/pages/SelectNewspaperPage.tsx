import { FC, useEffect, useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { NewspaperCard } from '../components/NewspaperCard'
import { useFormater } from '../hooks/useFormater'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { INewspaper } from '../types/library'

export const SelectNewspaperPage: FC = () => {
  const { id, year } = useParams()
  const {
    isLoading,
    newspapers,
  }: {
    isLoading: boolean
    newspapers: INewspaper[]
  } = {
    newspapers: [],
    isLoading: true,
  }
  /*
    n.publisher.id === Number(id) &&
    n.createdDate.getFullYear() === Number(year)
  */
  const _ = useFormater()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<{
    text: string
    date: Date | null
  }>({
    text: '',
    date: null,
  })

  useEffect(() => {
    if (!isLoading && !newspapers.length) navigate('/not-found/')
  }, [])

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
          Архив / {newspapers[0]?.publisher.name} / {year}
        </div>
        <h1>
          {newspapers[0]?.publisher.name}. {year} год
        </h1>
        <Row>
          <Col md={3}>
            <div className='newspaper-filter'>
              <Form.Control
                type='date'
                value={!!formData.date ? _(formData.date) : undefined}
                onChange={event => {
                  setFormData(fd => ({
                    ...fd,
                    date:
                      event.target.value !== 'Invalid Date'
                        ? new Date(event.target.value)
                        : null,
                  }))
                }}
              />
              <Form.Control
                type='text'
                placeholder='Поиск'
                value={formData.text}
                onChange={event =>
                  setFormData(fd => ({
                    ...fd,
                    text: event.target.value,
                  }))
                }
                style={{
                  marginTop: 16,
                }}
              />
            </div>
          </Col>
          <Col md={9}>
            <Row>
              {newspapers
                .filter(n => {
                  if (!(!!formData.text.length || !!formData.date)) {
                    return true
                  }

                  return (
                    (n.createdDate.getFullYear() ===
                      formData.date?.getFullYear() &&
                      n.createdDate.getMonth() === formData.date?.getMonth() &&
                      n.createdDate.getDate() === formData.date?.getDate()) ||
                    n.tags.indexOf(formData.text) + 1
                  )
                })
                .map(n => (
                  <NewspaperCard
                    key={n.id}
                    id={n.id}
                    imageUrl={n.previewImageUrl}
                    alt={n.name}
                    date={_(n.createdDate)}
                    size={4}
                    link={`/archive/newspapers/${n.id}/`}
                    tags={n.tags}
                    tagsClassName='white-scroll'
                  />
                ))}
            </Row>
          </Col>
        </Row>
        <div style={{ height: 60 }}></div>
      </Container>
    </>
  )
}
