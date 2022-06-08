import { FC, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Loader } from '../components/Loader'
import { Container, Row, Carousel } from 'react-bootstrap'
import { INewspaper } from '../types/library'
import { NewspaperCard } from '../components/NewspaperCard'
import { useFormater } from '../hooks/useFormater'

export const CategoryPage: FC = () => {
  const { isLoading, newspapers, categories } = useTypedSelector(
    state => state.library
  )
  const { fetchLibrary } = useActions()
  const [index, setIndex] = useState(0)
  const _ = useFormater()

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
      <Container>
        <h1>Подборки</h1>
      </Container>
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
                      <NewspaperCard
                        key={n.id}
                        id={n.id}
                        imageUrl={n.previewImageUrl}
                        alt={n.name}
                        date={_(n.createdDate)}
                        size={3}
                        link={`/archive/newspapers/${n.id}/`}
                        tags={n.tags}
                      />
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>

            <div style={{ height: 36 }}></div>
          </Container>
        </div>
      ))}
    </>
  )
}
