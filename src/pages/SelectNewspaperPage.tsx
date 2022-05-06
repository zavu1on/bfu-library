import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loader } from '../components/Loader'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const SelectNewspaperPage: FC = () => {
  const { id, year } = useParams()
  const { isLoading } = useTypedSelector(state => state.library)
  const newspapers = useTypedSelector(state =>
    state.library.newspapers.filter(
      n => n.id === Number(id) && n.createdDate.getFullYear() === Number(year)
    )
  )
  const { fetchLibrary } = useActions()

  useEffect(() => {
    if (!newspapers.length) fetchLibrary()
  })

  if (isLoading) return <Loader />

  return (
    <>
      <Header />
    </>
  )
}
