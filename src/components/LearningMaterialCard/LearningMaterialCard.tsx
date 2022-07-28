import { FC } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import star from '../../static/star-fill-black.svg'

interface IProps {
  id: number
  name: string
  created_date: string
  size: number
  isFavorite?: boolean
  favoriteClickHandler?: any
}

export const LearningMaterialCard: FC<IProps> = ({
  id,
  name,
  created_date,
  size,
  isFavorite,
  favoriteClickHandler,
}) => {
  return (
    <Col sm={size} className='margin-on-phone'>
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to={`/learning-materials/${id}/`} className='link-text'>
              {name}
            </Link>
          </Card.Title>
        </Card.Body>
        <Card.Footer className='text-muted'>
          {created_date}
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
        </Card.Footer>
      </Card>
    </Col>
  )
}
