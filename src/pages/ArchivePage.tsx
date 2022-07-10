import { FC } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { INewspaper, IPublisher } from '../types/library'
import { useQuery } from 'react-query'
import api from '../api'
import { AxiosResponse } from 'axios'

export const ArchivePage: FC = () => {
  const { isLoading: isPublishersLoading, data: publishers } = useQuery(
    'publishers',
    async (): Promise<AxiosResponse<IPublisher[]>> => {
      return await api.get('/library/publishers/all/')
    }
  )
  const { isLoading: isNewspapersLoading, data: importantNewspapers } =
    useQuery(
      'importantNewspapers',
      async (): Promise<AxiosResponse<INewspaper[]>> => {
        return await api.get('/library/newspapers/all/?is_important=True')
      }
    )

  const navigate = useNavigate()

  if (isPublishersLoading || isNewspapersLoading) return <Loader />

  return (
    <>
      <Header />
      <div className='important'>
        <Container className='important-container'>
          <h4>Важные выпуски</h4>

          <Row>
            {importantNewspapers?.data.map(n => (
              <Col key={n.id} sm={3}>
                <Link to={`/archive/newspapers/${n.id}/`}>
                  <img
                    src={n.preview_image}
                    alt={n.name}
                    className='squared-img'
                  />
                </Link>
                <Link
                  to={`/archive/newspapers/${n.id}/`}
                  style={{ color: '#000' }}
                >
                  {n.name}
                </Link>
              </Col>
            ))}
          </Row>
          <div style={{ height: 64 }}></div>
        </Container>
      </div>
      <div className='publishers'>
        <Container className='publishers-container'>
          <h4>Издатели</h4>
          <Row>
            {publishers?.data.map(p => (
              <Col key={p.id} sm={6}>
                <img
                  src={p.preview_image}
                  alt={p.name}
                  className='squared-img'
                />
                <div className='text'>
                  <h5>{p.name}</h5>
                  <p>{p.description}</p>
                  <div className='years'>{p.years_of_working} гг</div>
                  <div className='numbers'>{p.num_of_newspapers} номеров</div>
                  <Button
                    variant='outline-dark'
                    onClick={() => navigate(`/archive/publishers/${p.id}/`)}
                    style={{
                      marginTop: 18,
                    }}
                  >
                    Перейти
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          <div style={{ height: 36 }}></div>
        </Container>
      </div>
      <div style={{ height: 60 }}></div>
    </>
  )
}
