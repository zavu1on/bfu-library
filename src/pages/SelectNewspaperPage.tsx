import { FC, useEffect, useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { NewspaperCard } from '../components/NewspaperCard'
import { useFormater } from '../hooks/useFormater/useFormater'
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
    date: Date | null
  }>({
    text: '',
    date: null,
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
                  console.log(n.tags.length)

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
