import { FC } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface IProps {
  id: number | string
  imageUrl: string
  alt: string
  date: number | string
  tags?: string[]
  size: number
  link: string
  tagsClassName?: string
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
}) => {
  if (tags?.length) {
    return (
      <Col key={id} sm={size}>
        <div className='publisher-year-col'>
          <Link to={link}>
            <img src={imageUrl} alt={alt} className='squared-img' />
            <div className='text'>
              <div>{date}</div>
            </div>
          </Link>
        </div>
        <div className={'tags-container ' + tagsClassName}>
          {tags.map(t => (
            <div className='tags-item' key={t}>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </Col>
    )
  }

  return (
    <Col key={id} sm={size} className='publisher-year-col'>
      <Link to={link}>
        <img src={imageUrl} alt={alt} className='squared-img' />
        <div className='text'>
          <div>{date}</div>
        </div>
      </Link>
    </Col>
  )
}
