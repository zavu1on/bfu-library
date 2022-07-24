import { FC, useEffect, useState } from 'react'
import { Header } from '../components/Header/Header'
import { Container, Row, Carousel } from 'react-bootstrap'
import { ICategory, INewspaper } from '../types/library'
import { NewspaperCard } from '../components/NewspaperCard/NewspaperCard'
import { useFormater } from '../hooks/useFormater/useFormater'
import { Loader } from '../components/Loader'
import { useQuery } from 'react-query'
import api from '../api'
import { AxiosResponse } from 'axios'

export const CategoryPage: FC = () => {
  const { isLoading: isCategoriesLoading, data: categories } = useQuery(
    'categories',
    async (): Promise<AxiosResponse<ICategory[]>> => {
      return await api.get('library/categories/all/')
    }
  )
  const { isLoading: isNewspapersLoading, data: newspapers } = useQuery(
    'newspapersWithCategories',
    async (): Promise<AxiosResponse<INewspaper[]>> => {
      return await api.get('/library/newspapers/all/?category=True')
    }
  )

  const [index, setIndex] = useState(0)
  const _ = useFormater()

  useEffect(() => {
    document.body.setAttribute('style', 'background: #E5E5E5')

    return () => document.body.removeAttribute('style')
  }, [])

  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex)

  const splitNewspapers = (newspapers: INewspaper[]) => {
    const resp: INewspaper[][] = []

    for (let i = 0; i < newspapers.length; i++) {
      if (i % 4 === 0) resp.push([])

      resp[resp.length - 1].push(newspapers[i])
    }

    return resp
  }

  if (isCategoriesLoading || isNewspapersLoading) return <Loader />

  return (
    <>
      <Header />
      <Container>
        <h1>Подборки</h1>
      </Container>
      {categories?.data.map(category => (
        <div
          className='publishers'
          key={category?.name}
          style={{ marginTop: 56 }}
        >
          <Container className='publishers-container'>
            <h4>{category?.name}</h4>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {splitNewspapers(
                newspapers!.data.filter(n => n.category.name === category?.name)
              ).map(qs => (
                <Carousel.Item key={`item-${qs[0].id}`}>
                  <Row>
                    {qs.map(n => (
                      <NewspaperCard
                        key={n.id}
                        id={n.id}
                        imageUrl={n.preview_image}
                        alt={n.name}
                        date={_(n.created_date)}
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
