import { FC } from 'react'
import { Nav } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router'

export const Header: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Nav
      activeKey={pathname}
      onSelect={path => {
        if (path !== null) navigate(path)
      }}
    >
      <Nav.Item>
        <Nav.Link eventKey='/archive/'>Архив</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='/categories/'>Подборки</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='/learning-material/'>Учебные материалы</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
