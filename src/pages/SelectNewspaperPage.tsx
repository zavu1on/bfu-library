import { FC, useEffect, useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { NewspaperCard } from '../components/NewspaperCard'
import { useActions } from '../hooks/useActions'
import { useFormater } from '../hooks/useFormater'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const SelectNewspaperPage: FC = () => {
  const { id, year } = useParams()
  const { isLoading } = useTypedSelector(state => state.library)
  const newspapers = useTypedSelector(state =>
    state.library.newspapers.filter(
      n =>
        n.publisher.id === Number(id) &&
        n.createdDate.getFullYear() === Number(year)
    )
  )
  const { fetchLibrary } = useActions()
  const _ = useFormater()
  const [formData, setFormData] = useState<{
    text: string
    date: Date | null
  }>({
    text: '',
    date: null,
  })

  useEffect(() => {
    if (!newspapers.length) fetchLibrary()
  }, [])

  if (isLoading) return <Loader />

  return (
    <>
      <Header />
      <Container>
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
                    link={'/'}
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
