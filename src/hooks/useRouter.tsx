import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ArchivePage } from '../pages/ArchivePage'
import { IndexPage } from '../pages/IndexPage'

export const useRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/archive/' element={<ArchivePage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}
