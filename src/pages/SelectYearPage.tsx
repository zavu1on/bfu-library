import { FC, useEffect, useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const SelectYearPage: FC = () => {
  const { id } = useParams()
  const { publishers, isLoading } = useTypedSelector(state => state.library)
  const { fetchLibrary } = useActions()
  const [years, setYears] = useState<number[]>([])
  const [initialYears, setInitialYears] = useState<number[]>([])
  const publisher = publishers.find(p => p.id === Number(id))

  useEffect(() => {
    if (!publishers.length) fetchLibrary()
    document.body.setAttribute('style', 'background: #E5E5E5')

    return () => document.body.removeAttribute('style')
  }, [])

  useEffect(() => {
    const years = publishers.find(p => p.id === Number(id))?.yearsOfWorking
    if (!years) return

    const [start, end] = years.split(' - ')
    const arr = []

    for (let i = 0; i < Number(end) - Number(start); i++) {
      arr.push(i + Number(start))
    }
    arr.push(Number(end))

    setYears(arr)
    setInitialYears(arr)
  }, [publishers.length])

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
          / {publisher?.name}
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
                  className='publisher-year'
                />
                <div className='text'>
                  <div>{year}</div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        <div style={{ height: 30 }}></div>
      </Container>
    </>
  )
}
