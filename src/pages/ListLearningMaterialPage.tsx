import { FC, useEffect, useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { useFormater } from '../hooks/useFormater'
import { ILearningMaterial } from '../types/library'
import api from '../api'
import { AxiosResponse } from 'axios'
import { LearningMaterialCard } from '../components/LearningMaterialCard'

export const ListLearningMaterialPage: FC = () => {
  const { isLoading, data: learningMaterials } = useQuery(
    ['learning-materials'],
    async (): Promise<AxiosResponse<ILearningMaterial[]>> => {
      return await api.get(`/library/learning-materials/all/`)
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
    if (!isLoading && !learningMaterials?.data.length) navigate('/not-found/')
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
          Учебные материалы
        </div>
        <h1>Учебные материалы</h1>
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
              {learningMaterials?.data
                .filter(lm => {
                  if (!(!!formData.text.length || !!formData.date)) {
                    return true
                  }

                  return (
                    (new Date(lm.created_date).getFullYear() ===
                      formData.date?.getFullYear() &&
                      new Date(lm.created_date).getMonth() ===
                        formData.date?.getMonth() &&
                      new Date(lm.created_date).getDate() ===
                        formData.date?.getDate()) ||
                    lm.name.toLowerCase().indexOf(formData.text.toLowerCase()) +
                      1
                  )
                })
                .map(lm => (
                  <LearningMaterialCard
                    key={lm.id}
                    id={lm.id}
                    name={lm.name}
                    created_date={lm.created_date}
                    size={4}
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
