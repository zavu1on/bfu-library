import { FC } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import star from '../static/star-fill.svg'

interface IProps {
  id: number | string
  imageUrl: string
  alt: string
  date: number | string | undefined
  tags?: {
    name: string
  }[]
  size: number
  link: string
  tagsClassName?: string
  isFavorite?: boolean
  favoriteClickHandler?: any
}

export const NewspaperCard: FC<IProps> = ({
  id,
  imageUrl,
  alt,
  date,
  size,
  link,
  tags,
  tagsClassName,
  isFavorite,
  favoriteClickHandler,
}) => {
  if (tags?.length) {
    return (
      <Col sm={size}>
        <div className='publisher-year-col margin-on-phone'>
          <Link to={link}>
            <img src={imageUrl} alt={alt} className='squared-img' />
            <div className='text'>
              <div>{date}</div>
              {isFavorite ? (
                <button
                  className='star'
                  onClick={event => {
                    event.preventDefault()

                    favoriteClickHandler()
                  }}
                >
                  <img src={star} alt='star' />
                </button>
              ) : null}
            </div>
          </Link>
        </div>
        <div className={'tags-container ' + tagsClassName}>
          {tags.map(t => (
            <div className='tags-item' key={t.name}>
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </Col>
    )
  }

  return (
    <Col key={id} sm={size}>
      <div className='publisher-year-col margin-on-phone'>
        <Link to={link}>
          <img src={imageUrl} alt={alt} className='squared-img' />
          <div className='text'>
            <div>{date}</div>
            {isFavorite ? (
              <button
                className='star'
                onClick={event => {
                  event.preventDefault()

                  favoriteClickHandler()
                }}
              >
                <img src={star} alt='star' />
              </button>
            ) : null}
          </div>
        </Link>
      </div>
    </Col>
  )
}
