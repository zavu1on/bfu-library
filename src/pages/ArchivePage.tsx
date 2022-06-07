import { FC, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Header } from '../components/Header'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Loader } from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'

export const ArchivePage: FC = () => {
  const { isLoading, newspapers, publishers } = useTypedSelector(
    state => state.library
  )
  const importantNewspapers = newspapers.filter(n => n.isImportant)
  const { fetchLibrary } = useActions()
  const navigate = useNavigate()

  useEffect(() => {
    if (!publishers.length) fetchLibrary()
  }, [])

  if (isLoading) return <Loader />

  return (
    <>
      <Header />
      <div className='important'>
        <Container className='important-container'>
          <h4>Важные выпуски</h4>

          <Row>
            {importantNewspapers.map(n => (
              <Col key={n.id} sm={3}>
                <Link to={'/'}>
                  <img
                    src={n.previewImageUrl}
                    alt={n.name}
                    className='squared-img'
                  />
                </Link>
                <Link to={'/'} style={{ color: '#000' }}>
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
            {publishers.map(p => (
              <Col key={p.id} sm={6}>
                <img
                  src={p.previewImageUrl}
                  alt={p.name}
                  className='squared-img'
                />
                <div className='text'>
                  <h5>{p.name}</h5>
                  <p>{p.description}</p>
                  <div className='years'>{p.yearsOfWorking} гг</div>
                  <div className='numbers'>{p.numOfNewspapers} номеров</div>
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
