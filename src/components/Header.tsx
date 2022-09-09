import { FC } from 'react'
import { Nav } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router'

export const Header: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Nav
      activeKey={`/${pathname.split('/')[1]}/`}
      onSelect={path => {
        if (path !== null) navigate(path)
      }}
    >
      <Nav.Item>
        <Nav.Link eventKey='/'>О проекте</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='/archive/'>Архив</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='/categories/'>Избранное</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='/learning-materials/'>
          Учебно-методические материалы
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className='lms'>
        <Nav.Link eventKey='/lms/'>Личный кабинет</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
