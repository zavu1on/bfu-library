import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap'
import logo from '../static/logo.svg'
import bfu from '../static/bfu.png'
import img1 from '../static/images/1.jpg'
import img2 from '../static/images/2.jpg'
import img3 from '../static/images/3.jpg'
import img4 from '../static/images/4.jpg'
import img5 from '../static/images/5.jpg'
import img6 from '../static/images/6.jpg'
import img7 from '../static/images/7.jpg'
import img8 from '../static/images/8.jpg'
import img9 from '../static/images/9.jpg'
import img10 from '../static/images/10.jpg'
import author4 from '../static/authors/author4.jpg'

export const IndexPage: FC = () => {
  const [title, setTitle] = useState('Архив газет Калининградской области')
  const [index, setIndex] = useState(0)
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

  useEffect(() => {
    const anchors = document.querySelectorAll('a[href*="#"]')

    anchors.forEach((anchor: Element) => {
      anchor.addEventListener('click', e => {
        e.preventDefault()

        const blockID = anchor.getAttribute('href')!.substr(1)

        document.getElementById(blockID)!.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    })
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
            {/* <li>
              <a href='#mission'>Миссия</a>
            </li> */}
            <li>
              <a href='#authors'>Авторы проекта</a>
            </li>
            <li>
              <a href='#how-to-create'>Как создавалась "БФУ Библиотека"</a>
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
          <q style={{ marginTop: 8, display: 'block' }}>
            Газета приучает читателя размышлять о том, чего он не знает, и знать
            то, что не понимает
          </q>
          <span>В.О. Ключевский</span>
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
            <div className='landing-text white-scroll'>
              В системе исторических источников периодическая печать закономерно
              занимает существенное место. Редкое историческое исследование
              событий, явлений, фактов нового и новейшего времени обходится без
              обращения к материалам периодики. Особенно вырастает значение
              прессы с появлением современных методов анализа газетного
              материала на основе создания баз данных и новейших приемов их
              обработки и осмысления. Создание базы данных материалов газеты
              «Калининградская правда» за 1946-1991 гг., и размещение этих
              материалов в открытом для пользователей сетевом ресурсе он-лайн
              архива региональной прессы советского периода весьма перспективная
              задача. Достоинством этого проекта, является его многоплановость,
              соединение учебных и научных работ на всех этапах его реализации.
              Проект дает возможность участия в нем студентов, магистрантов,
              аспирантов и опытных исследователей-преподавателей, современная
              форма освоение учебного материала в форме учебной и
              исследовательской проектной деятельности, возможность ранжирования
              учебных, практических и научных задач по нарастающей сложности,
              что позволяет привлекать учащихся разных курсов и уровня
              источниковедческой и исследовательской подготовки, вплоть до
              учеников средней школы. Наконец электронный формат и открытость
              доступа позволяет привлечь внимание к источнику и возможностям
              работы с ним всех желающих, любителей истории и краеведов.
            </div>
          </div>
        </div>
      </Container>
      <Container className='landing-container' id='authors'>
        <h2>Авторы проекта</h2>
        <Row>
          <Col md={3} sm={6}>
            <div className='author'>
              <img
                src={
                  'https://www.pngkit.com/png/full/126-1262807_instagram-default-profile-picture-png.png'
                }
                alt='Баранова Елена Вячеславовна'
              />
              <h6>Баранова Елена Вячеславовна</h6>
              <em>Руководитель проекта</em>
              <div>
                к. и. н., Директор НИЦ социально-гуманитарной информатики БФУ
                им. И. Канта
              </div>
              <a href='mailto:EBaranova@kantiana.ru'>EBaranova@kantiana.ru</a>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className='author'>
              <img
                src={
                  'https://www.pngkit.com/png/full/126-1262807_instagram-default-profile-picture-png.png'
                }
                alt='Маслов Виталий Николаевич'
              />
              <h6>Маслов Виталий Николаевич</h6>
              <em>Автор образовательного курса</em>
              <div>
                к. и. н., научный сотрудник НИЦ социально-гуманитарной
                информатики БФУ им. И. Канта
              </div>
              <a href='mailto:VMaslov@kantiana.ru'>VMaslov@kantiana.ru</a>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className='author'>
              <img
                src={
                  'https://www.pngkit.com/png/full/126-1262807_instagram-default-profile-picture-png.png'
                }
                alt='Данилин Александр Николаевич'
              />
              <h6>Данилин Александр Николаевич</h6>
              <em>Программист</em>
              <div>
                Начальник отдела разработок программного обеспечения БФУ им. И.
                Канта
              </div>
              <a href='mailto:ADanilin@kantiana.ru'>ADanilin@kantiana.ru</a>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className='author'>
              <img src={author4} alt='Саенко Ангелина Вячеславовна' />
              <h6>Саенко Ангелина Вячеславовна</h6>
              <em>Систематизация архива и поиск материала</em>
              <div>НИЦ социально-гуманитарной информатики БФУ им. И. Канта</div>
              <a href='mailto:AVSaenko1@kantiana.ru'>AVSaenko1@kantiana.ru</a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className='landing-delimiter'>
        <Row>
          <Col md={4} sm={12}>
            <div className='top'>45</div>
            <div className='bottom'>Лет охватывает архив</div>
          </Col>
          <Col md={4} sm={12}>
            <div className='top'>103000</div>
            <div className='bottom'>Выпусков опубликовано</div>
          </Col>
          <Col md={4} sm={12}>
            <div className='top'>20</div>
            <div className='bottom'>Лет сотрудничаем с БФУ имени Канта</div>
          </Col>
        </Row>
      </div>
      {/* <Container className='landing-container' id='mission'>
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
              tempus.
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
      </Container> */}
      <Container className='landing-container' id='how-to-create'>
        <h2>Как создавалась "БФУ Библиотека"</h2>
        <Carousel
          activeIndex={index}
          onSelect={(selectedIndex: number) => setIndex(selectedIndex)}
        >
          {[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10].map(
            (src, idx) => (
              <Carousel.Item key={`item-${idx}`}>
                <img src={src} alt='image' />
              </Carousel.Item>
            )
          )}
        </Carousel>
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
