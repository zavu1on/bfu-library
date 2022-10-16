import { FC, useEffect, useState } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { NewspaperCard } from '../components/NewspaperCard'
import { useFormater } from '../hooks/useFormater'
import { INewspaper } from '../types/library'
import api from '../api'
import { AxiosResponse } from 'axios'

export const SelectNewspaperPage: FC = () => {
  const { id, year } = useParams()
  const { isLoading, data: newspapers } = useQuery(
    ['newspaper', id, year],
    async (): Promise<AxiosResponse<INewspaper[]>> => {
      return await api.get(
        `/library/newspapers/all/?publisher=${id}&created_date=${year}`
      )
    }
  )

  const _ = useFormater()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<{
    text: string
    date: Date | undefined
  }>({
    text: '',
    date: undefined,
  })

  useEffect(() => {
    if (!isLoading && !newspapers?.data.length) navigate('/not-found/')
  }, [isLoading])

  if (isLoading || !newspapers?.data.length) return <Loader />

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
          Архив / {newspapers!.data[0]!.publisher.name} / {year}
        </div>
        <h1>
          {newspapers!.data[0]!.publisher.name}. {year} год
        </h1>
        <Row>
          <Col md={3}>
            <div className='newspaper-filter'>
              <Form.Control
                type='date'
                value={_(formData.date)}
                onChange={event => {
                  if (event.target.value.startsWith('0')) {
                    return event.preventDefault()
                  }

                  setFormData(fd => ({
                    ...fd,
                    date:
                      event.target.value !== ''
                        ? new Date(event.target.value)
                        : undefined,
                  }))
                }}
              />
              <Form.Control
                type='text'
                placeholder='Поиск по тегам'
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
              <Button
                variant='outline-dark'
                size='sm'
                style={{
                  marginTop: 16,
                }}
                onClick={() => {
                  const dateInput = document.querySelector(
                    'input[type="date"]'
                  ) as HTMLInputElement
                  dateInput.value = 'undefined'

                  setFormData({
                    text: '',
                    date: undefined,
                  })
                }}
              >
                Очистить форму
              </Button>
            </div>
          </Col>
          <Col md={9}>
            <Row>
              {newspapers?.data
                .filter(n => {
                  if (!(!!formData.text.length || !!formData.date)) {
                    return true
                  }

                  return (
                    (new Date(n.created_date).getFullYear() ===
                      formData.date?.getFullYear() &&
                      new Date(n.created_date).getMonth() ===
                        formData.date?.getMonth() &&
                      new Date(n.created_date).getDate() ===
                        formData.date?.getDate()) ||
                    n.tags.filter(t => t.name === formData.text).length
                  )
                })
                .map(n => {
                  if (n.tags.length > 0) {
                    return (
                      <NewspaperCard
                        key={n.id}
                        id={n.id}
                        imageUrl={n.preview_image}
                        alt={n.name}
                        date={_(n.created_date)}
                        size={4}
                        link={`/archive/newspapers/${n.id}/`}
                        tags={n.tags}
                        tagsClassName='white-scroll'
                      />
                    )
                  }

                  return (
                    <NewspaperCard
                      key={n.id}
                      id={n.id}
                      imageUrl={n.preview_image}
                      alt={n.name}
                      date={_(n.created_date)}
                      size={4}
                      link={`/archive/newspapers/${n.id}/`}
                      tagsClassName='white-scroll'
                    />
                  )
                })}
            </Row>
          </Col>
        </Row>
        <div style={{ height: 60 }}></div>
      </Container>
    </>
  )
}
