import { FC, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Loader } from '../components/Loader'
import { useActions } from '../hooks/useActions'
import { useFormater } from '../hooks/useFormater/useFormater'
import { useTypedSelector } from '../hooks/useTypedSelector'
import star from '../static/star-black.svg'
import starFill from '../static/star-fill-black.svg'
import { ILearningMaterial } from '../types/library'
import { useQuery } from 'react-query'
import api from '../api'
import { AxiosResponse } from 'axios'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

export const DetailLearningMaterialPage: FC = () => {
  const { id } = useParams()
  const [pages, setPages] = useState(0)
  const navigate = useNavigate()
  const { isLoading, data: learningMaterial } = useQuery(
    ['learning-materials', id],
    async (): Promise<AxiosResponse<ILearningMaterial>> => {
      return await api.get(`/library/learning-materials/get/${id}/`)
    }
  )
  const { role, favoriteLearningMaterials } = useTypedSelector(
    state => state.auth
  )
  const { checkLearningMaterialIsFavorite } = useActions()
  const _ = useFormater()

  useEffect(() => {
    if (!isLoading && !learningMaterial?.data) navigate('/not-found/')
  }, [])

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
          Учебные материалы / {learningMaterial?.data.name}
        </div>

        <h4 style={{ marginTop: 70 }}>
          <a
            href={learningMaterial?.data.file}
            className='link-text'
            target='_blank'
          >
            {learningMaterial?.data.name} -{' '}
            {learningMaterial?.data.created_date}
          </a>
          {role !== 'Unanimous' ? (
            <button
              className='star'
              style={{
                position: 'relative',
                right: 0,
                left: 6,
                bottom: 2,
              }}
              onClick={() =>
                checkLearningMaterialIsFavorite(learningMaterial!.data)
              }
            >
              <img
                src={
                  !!favoriteLearningMaterials.find(
                    f => f.id === learningMaterial?.data?.id
                  )
                    ? starFill
                    : star
                }
                alt='star'
                style={{
                  fill: 'black',
                }}
              />
            </button>
          ) : null}
        </h4>

        <div className='center'>
          <Document
            file={learningMaterial?.data.file}
            onLoadSuccess={proxy => setPages(proxy.numPages)}
          >
            {!!pages
              ? new Array(pages)
                  .fill(null)
                  .map((_, idx) => (
                    <Page
                      key={idx}
                      pageNumber={idx + 1}
                      renderTextLayer={false}
                    />
                  ))
              : null}
          </Document>
        </div>

        <div style={{ height: 100 }}></div>
      </Container>
    </>
  )
}
