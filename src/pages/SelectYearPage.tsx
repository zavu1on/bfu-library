import { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { IPublisher } from '../types/library'

export const SelectYearPage: FC = () => {
  const { id } = useParams()
  const {
    isLoading,
    publisher,
  }: {
    isLoading: boolean
    publisher: IPublisher | null
  } = {
    isLoading: false,
    publisher: null,
  }
  // p.id === Number(id)
  const navigate = useNavigate()
  const [years, setYears] = useState<number[]>([])
  const [initialYears, setInitialYears] = useState<number[]>([])

  useEffect(() => {
    if (!isLoading && !publisher) navigate('/not-found/')

    document.body.setAttribute('style', 'background: #E5E5E5')

    return () => document.body.removeAttribute('style')
  }, [])

  useEffect(() => {
    const years = publisher?.yearsOfWorking
    if (!years) return

    const [start, end] = years.split(' - ')
    const arr = []

    for (let i = 0; i < Number(end) - Number(start); i++) {
      arr.push(i + Number(start))
    }
    arr.push(Number(end))

    setYears(arr)
    setInitialYears(arr)
  }, [publisher])

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
          Архив / {publisher?.name}
        </div>
        <Form.Control
          type='text'
          placeholder='Поиск'
          style={{
            marginTop: 50,
            width: 'auto',
          }}
          onChange={event => {
            if (event.target.value.trim().length) {
              setYears(
                initialYears.filter(
                  y => String(y).indexOf(event.target.value) + 1
                )
              )
            } else {
              setYears(initialYears)
            }
          }}
        />
        <Row
          style={{
            marginTop: 30,
          }}
        >
          {years.map(year => (
            <Col key={year} sm={4} className='publisher-year-col'>
              <Link to={`/archive/publishers/${id}/${year}/`}>
                <img
                  src={publisher?.previewImageUrl}
                  alt={year.toString()}
                  className='squared-img'
                  style={{
                    height: 300,
                  }}
                />
                <div className='text calc-width'>
                  <div>{year}</div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        <div style={{ height: 36 }}></div>
      </Container>
    </>
  )
}
