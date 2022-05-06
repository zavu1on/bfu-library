import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ArchivePage } from '../pages/ArchivePage'
import { CategoryPage } from '../pages/CategoryPage'
import { IndexPage } from '../pages/IndexPage'
import { SelectNewspaperPage } from '../pages/SelectNewspaperPage'
import { SelectYearPage } from '../pages/SelectYearPage'

export const useRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/archive/' element={<ArchivePage />} />
        <Route path='/categories/' element={<CategoryPage />} />
        <Route path='/publishers/:id/' element={<SelectYearPage />} />
        <Route
          path='/publishers/:id/:year/'
          element={<SelectNewspaperPage />}
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}
