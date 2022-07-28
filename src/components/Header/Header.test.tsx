import { Header } from './Header'
import { render, screen } from '@testing-library/react'
import jest from 'jest'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

describe('Header', () => {
  test('Страница Архива', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/archive/' element={<Header />} />
          <Route path='*' element={<Navigate to={'/archive/'} />} />
        </Routes>
      </BrowserRouter>
    )

    const activeLink = screen.getByText('Архив')
    expect(activeLink.classList).toContain('active')
    expect(activeLink).toMatchSnapshot()

    const inactiveLink = screen.getByText('Подборки')
    expect(inactiveLink.classList.length).toEqual(1)
    expect(inactiveLink).toMatchSnapshot()
  })

  test('Страница Подборок', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/categories/' element={<Header />} />
          <Route path='*' element={<Navigate to={'/categories/'} />} />
        </Routes>
      </BrowserRouter>
    )

    const activeLink = screen.getByText('Подборки')
    expect(activeLink.classList).toContain('active')
    expect(activeLink).toMatchSnapshot()

    const inactiveLink = screen.getByText('Учебные материалы')
    expect(inactiveLink.classList.length).toEqual(1)
    expect(inactiveLink).toMatchSnapshot()
  })

  test('Страница Учебных материалов', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/learning-materials/' element={<Header />} />
          <Route path='*' element={<Navigate to={'/learning-materials/'} />} />
        </Routes>
      </BrowserRouter>
    )

    const activeLink = screen.getByText('Учебные материалы')
    expect(activeLink.classList).toContain('active')
    expect(activeLink).toMatchSnapshot()
  })
})
