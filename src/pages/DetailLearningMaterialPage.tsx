import { FC, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Loader } from '../components/Loader'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import star from '../static/star-black.svg'
import starFill from '../static/star-fill-black.svg'
import { ILearningMaterial } from '../types/library'
import { useQuery } from 'react-query'
import api from '../api'
import { AxiosResponse } from 'axios'
// @ts-ignore
import { PDFReader } from 'reactjs-pdf-reader'

export const DetailLearningMaterialPage: FC = () => {
  const { id } = useParams()
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
          <PDFReader
            url={learningMaterial?.data.file}
            showAllPage={true}
            scale={1.2}
          />
        </div>

        <div style={{ height: 100 }}></div>
      </Container>
    </>
  )
}
