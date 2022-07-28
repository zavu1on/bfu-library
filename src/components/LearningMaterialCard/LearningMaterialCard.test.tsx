import { LearningMaterialCard } from './LearningMaterialCard'
import { render, screen, fireEvent } from '@testing-library/react'
import jest from 'jest'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useFormater } from '../../hooks/useFormater/useFormater'

const _ = useFormater()

describe('LearningMaterialCard.test', () => {
  test('Карточка', () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <LearningMaterialCard
                id={1}
                name={'test'}
                created_date={_(new Date())}
                size={4}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )

    screen.getByText(_(new Date()))

    expect(!!container.querySelector('.col-sm-4')).toBeTruthy()
  })

  test('Карточка, отмечена избранной', () => {
    let hasClicked = false
    const setHasClicked = () => (hasClicked = true)

    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <LearningMaterialCard
                id={1}
                name={'test'}
                created_date={_(new Date())}
                size={4}
                isFavorite={true}
                favoriteClickHandler={setHasClicked}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )

    screen.getByText(_(new Date()))

    expect(!!container.querySelector('.col-sm-4')).toBeTruthy()
    expect(!!screen.getByAltText('star')).toBeTruthy()

    const btn = container.querySelector('button.star')
    expect(!!btn).toBeTruthy()
    fireEvent.click(btn!)
    expect(hasClicked).toBeTruthy()
  })
})
