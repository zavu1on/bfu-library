import { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Form, Carousel } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { IPublisher } from '../types/library'
import api from '../api'
import { AxiosResponse } from 'axios'

export const SelectYearPage: FC = () => {
  const { id } = useParams()
  const { isLoading, data: publisher } = useQuery(
    ['publisher', id],
    async (): Promise<AxiosResponse<IPublisher>> => {
      return await api.get(`/library/publishers/get/${id}/`)
    }
  )
  const navigate = useNavigate()
  const [years, setYears] = useState<number[]>([])
  const [yearsBy10, setYearsBy10] = useState<string[]>([])
  const [initialYears, setInitialYears] = useState<number[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!isLoading && !publisher?.data) navigate('/not-found/')

    document.body.setAttribute('style', 'background: #E5E5E5')

    return () => document.body.removeAttribute('style')
  }, [])
  useEffect(() => {
    const years = publisher?.data.years_of_working

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
  useEffect(() => {
    if (!yearsBy10.length) {
      for (let i = 0; i < years.length; i++) {
        if (i % 10 === 0 && i !== 0) {
          setYearsBy10(prev => [...prev, `${years[i - 10]} - ${years[i]}`])
        }
        if (i === years.length - 1) {
          setYearsBy10(prev => [
            ...prev,
            `${years[i - (i % 10)]} - ${years[i]}`,
          ])
        }
      }
    }
  }, [years])

  const splitYears = (years: string[]) => {
    const resp: string[][] = []

    for (let i = 0; i < years.length; i++) {
      if (i % 4 === 0) resp.push([])

      resp[resp.length - 1].push(years[i])
    }

    return resp
  }

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
          Архив / {publisher?.data.name}
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
        <br />
        <Carousel
          activeIndex={activeIndex}
          onSelect={(num: number) => setActiveIndex(num)}
        >
          {splitYears(yearsBy10).map(qs => (
            <Carousel.Item key={`item-${qs[0]}`}>
              <Row>
                {qs.map(year => (
                  <Col md={3} sm={6} className='publisher-year-col'>
                    <div
                      onClick={() => {
                        setYears(
                          initialYears.filter(i => {
                            return (
                              Number(year.split(' - ')[0]) <= i &&
                              Number(year.split(' - ')[1]) >= i
                            )
                          })
                        )
                      }}
                    >
                      <div className='not-absolute-text calc-width'>
                        <div>{year}</div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
        <Row
          style={{
            marginTop: 30,
          }}
        >
          {years.map(year => (
            <Col key={year} sm={4} className='publisher-year-col'>
              <Link to={`/archive/publishers/${id}/${year}/`}>
                <img
                  src={publisher?.data.preview_image}
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
