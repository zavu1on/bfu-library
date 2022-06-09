import { FC, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import logo from '../static/logo.svg'
import bfu from '../static/bfu.png'
import library from '../static/library.png'

export const IndexPage: FC = () => {
  const [title, setTitle] = useState('Архив газет Калининградской области')
  const navigate = useNavigate()

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 650) {
        setTitle('Архив газет')
      }
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <>
      <header>
        <div className='logo-container'>
          <Link to={'/'}>
            <img src={logo} alt='logo' className='logo' />
            <span>{title}</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <a href='#about-project'>О проекте</a>
            </li>
            <li>
              <a href='#mission'>Миссия</a>
            </li>
            <li>
              <a href='#instructions'>Инструкции</a>
            </li>
            <li>
              <Link to='/archive/'>Открыть Архив</Link>
            </li>
          </ul>
        </nav>
        <div className='quote'>
          Гордиться славою своих предков не только можно, но и должно; не
          уважать оной есть постыдное малодушие!
        </div>
      </header>
      <Container className='landing-container' id='about-project'>
        <h2>О проекте</h2>
        <div className='content'>
          <img
            src={bfu}
            alt='БФУ'
            className='landing-img'
            style={{
              marginRight: 30,
            }}
          />
          <div className='text'>
            <h3 className='text-title'>Lorem ipsum dolor sit amet</h3>
            <div className='landing-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
              eleifend eu elementum est tempus. Sit congue aliquam facilisi
              feugiat condimentum vitae vivamus integer et. Massa magna eu,
              suspendisse sit pretium mi libero, condimentum. Vulputate
              ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Amet eleifend eu elementum est
              tempus. Sit{' '}
            </div>
          </div>
        </div>
      </Container>
      <div className='landing-delimiter'>
        <Row>
          <Col md={4} sm={12}>
            <div className='top'>75</div>
            <div className='bottom'>Лет охватывает архив</div>
          </Col>
          <Col md={4} sm={12}>
            <div className='top'>103000</div>
            <div className='bottom'>Лет охватывает архив</div>
          </Col>
          <Col md={4} sm={12}>
            <div className='top'>20</div>
            <div className='bottom'>Лет сотрудничаем с БФУ имени Канта</div>
          </Col>
        </Row>
      </div>
      <Container className='landing-container' id='mission'>
        <h2>Миссия</h2>
        <div className='content'>
          <div className='text'>
            <h3 className='text-title'>Lorem ipsum dolor sit amet</h3>
            <div className='landing-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
              eleifend eu elementum est tempus. Sit congue aliquam facilisi
              feugiat condimentum vitae vivamus integer et. Massa magna eu,
              suspendisse sit pretium mi libero, condimentum. Vulputate
              ullamcorper augue tincidunt id sed turpis.Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Amet eleifend eu elementum est
              tempus. Sit{' '}
            </div>
          </div>
          <img
            src={library}
            alt='БФУ'
            className='landing-img'
            style={{
              marginRight: 30,
            }}
          />
        </div>
      </Container>
      <Container className='landing-container' id='instructions'>
        <h2>Инструкции</h2>
        <div className='content instruction'>
          <Row>
            <Col className='instruction-item' md={4} sm={12}>
              <div className='square'>
                <div className='top'>1</div>
                <div className='bottom'>Пройти регистрацию</div>
              </div>
            </Col>
            <Col className='instruction-item' md={4} sm={12}>
              <div className='square'>
                <div className='top'>2</div>
                <div className='bottom'>Оплатить подписку</div>
              </div>
            </Col>
            <Col className='instruction-item' md={4} sm={12}>
              <div className='square'>
                <div className='top'>3</div>
                <div className='bottom'>Пользоваться БФУ Библиотекой</div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <aside>
        {/* <div>
          Народ, не знающий своего прошлого,
          <br />
          имеет будущего
        </div> */}
        <Button variant='dark' size='lg' onClick={() => navigate('/archive/')}>
          Открыть архив
        </Button>
      </aside>
      <footer>
        <a href='https://kantiana.ru' target='_blank'>
          © 2022 Балтийский федеральный университет имени Иммануила Канта
        </a>
      </footer>
    </>
  )
}
