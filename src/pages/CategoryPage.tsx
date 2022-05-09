import { FC, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'
import { Container, Col, Row, Carousel } from 'react-bootstrap'
import { INewspaper } from '../types/library'

export const CategoryPage: FC = () => {
  const { isLoading, newspapers, categories } = useTypedSelector(
    state => state.library
  )
  const { fetchLibrary } = useActions()
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex)

  const splitNewspapers = (newspapers: INewspaper[]) => {
    const resp: INewspaper[][] = []

    for (let i = 0; i < newspapers.length; i++) {
      if (i % 4 === 0) resp.push([])

      resp[resp.length - 1].push(newspapers[i])
    }

    return resp
  }

  useEffect(() => {
    if (!newspapers.length) fetchLibrary()
    document.body.setAttribute('style', 'background: #E5E5E5')

    return () => document.body.removeAttribute('style')
  }, [])

  if (isLoading) return <Loader />

  return (
    <>
      <Header />
      {categories.map(category => (
        <div className='publishers' key={category} style={{ marginTop: 56 }}>
          <Container className='publishers-container'>
            <h4>{category}</h4>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {splitNewspapers(
                newspapers.filter(n => n.category === category)
              ).map(qs => (
                <Carousel.Item key={`item-${qs[0].id}`}>
                  <Row>
                    {qs.map(n => (
                      <Col
                        key={n.id}
                        sm={3}
                        className='publisher-year-col'
                        style={{
                          height: 300,
                        }}
                      >
                        <Link to={'/'}>
                          <img
                            src={n?.previewImageUrl}
                            alt={n.name}
                            className='squared-img'
                          />
                          <div className='text'>
                            <div>{n?.createdDate.getFullYear()}</div>
                          </div>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>

            <div style={{ height: 30 }}></div>
          </Container>
        </div>
      ))}
    </>
  )
}
