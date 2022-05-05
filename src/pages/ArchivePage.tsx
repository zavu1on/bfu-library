import { FC, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Header } from '../components/Header'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'

export const ArchivePage: FC = () => {
  const { isLoading, newspapers } = useTypedSelector(state => state.library)
  const importantNewspapers = newspapers.filter(n => n.isImportant)
  const { fetchLibrary } = useActions()

  useEffect(() => {
    fetchLibrary()
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
              <Col
                sm={3}
                style={{
                  height: 340,
                }}
              >
                <Link
                  to={'/'}
                  style={{
                    backgroundImage: `url(${n.previewImageUrl})`,
                  }}
                  className='squared-img'
                ></Link>
                <Link to={'/'} style={{ color: '#000' }}>
                  {n.name}
                </Link>
              </Col>
            ))}
          </Row>
          <div style={{ height: 64 }}></div>
        </Container>
      </div>
    </>
  )
}
