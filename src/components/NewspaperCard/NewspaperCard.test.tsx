import { NewspaperCard } from '../NewspaperCard'
import { render, screen, fireEvent } from '@testing-library/react'
import jest from 'jest'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useFormater } from '../../hooks/useFormater/useFormater'

const _ = useFormater()

describe('NewspaperCard', () => {
  test('Карточка без тегов', () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <NewspaperCard
                id={1}
                imageUrl={'https://place-hold.it/350x480/'}
                alt={'test image'}
                date={_(new Date())}
                size={3}
                link={`/archive/newspapers/1/`}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )

    screen.getByText(_(new Date()))

    const image = screen.getByAltText('test image') as HTMLImageElement
    expect(image.src).toEqual('https://place-hold.it/350x480/')

    expect(!!container.querySelector('.col-sm-3')).toBeTruthy()
  })

  test('Карточка с тегами', () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <NewspaperCard
                id={1}
                imageUrl={'https://place-hold.it/350x480/'}
                alt={'test image'}
                date={_(new Date())}
                size={3}
                link={`/archive/newspapers/1/`}
                tagsClassName='test-class-name'
                tags={[
                  {
                    name: 'Кино',
                  },
                  {
                    name: 'Игры',
                  },
                  {
                    name: 'Фантастика',
                  },
                  {
                    name: 'Тренд',
                  },
                ]}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )

    screen.getByText(_(new Date()))

    const image = screen.getByAltText('test image') as HTMLImageElement
    expect(image.src).toEqual('https://place-hold.it/350x480/')

    expect(!!container.querySelector('.col-sm-3')).toBeTruthy()

    const tags = container.querySelectorAll(
      '.tags-container.test-class-name .tags-item'
    )
    expect(tags.length).toEqual(4)
    expect(tags).toMatchSnapshot()
  })

  test('Карточка без тегов, отмечена избранной', () => {
    let hasClicked = false
    const setHasClicked = () => (hasClicked = true)

    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <NewspaperCard
                id={1}
                imageUrl={'https://place-hold.it/350x480/'}
                alt={'test image'}
                date={_(new Date())}
                size={3}
                link={`/archive/newspapers/1/`}
                isFavorite={true}
                favoriteClickHandler={setHasClicked}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )

    screen.getByText(_(new Date()))

    const image = screen.getByAltText('test image') as HTMLImageElement
    expect(image.src).toEqual('https://place-hold.it/350x480/')

    expect(!!container.querySelector('.col-sm-3')).toBeTruthy()
    expect(!!screen.getByAltText('star')).toBeTruthy()

    const btn = container.querySelector('button.star')
    expect(!!btn).toBeTruthy()
    fireEvent.click(btn!)
    expect(hasClicked).toBeTruthy()
  })

  test('Карточка с тегами, отмечена избранной', () => {
    let hasClicked = false
    const setHasClicked = () => (hasClicked = true)

    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <NewspaperCard
                id={1}
                imageUrl={'https://place-hold.it/350x480/'}
                alt={'test image'}
                date={_(new Date())}
                size={3}
                link={`/archive/newspapers/1/`}
                tagsClassName='test-class-name'
                tags={[
                  {
                    name: 'Кино',
                  },
                  {
                    name: 'Игры',
                  },
                  {
                    name: 'Фантастика',
                  },
                  {
                    name: 'Тренд',
                  },
                ]}
                isFavorite={true}
                favoriteClickHandler={setHasClicked}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    )

    screen.getByText(_(new Date()))

    const image = screen.getByAltText('test image') as HTMLImageElement
    expect(image.src).toEqual('https://place-hold.it/350x480/')

    const tags = container.querySelectorAll(
      '.tags-container.test-class-name .tags-item'
    )
    expect(tags.length).toEqual(4)
    expect(tags).toMatchSnapshot()

    expect(!!container.querySelector('.col-sm-3')).toBeTruthy()
    expect(!!screen.getByAltText('star')).toBeTruthy()

    const btn = container.querySelector('button.star')
    expect(!!btn).toBeTruthy()
    fireEvent.click(btn!)
    expect(hasClicked).toBeTruthy()
  })
})
