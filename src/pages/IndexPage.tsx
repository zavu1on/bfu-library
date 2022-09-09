import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap'
import logo from '../static/logo.svg'
import bfu from '../static/bfu.png'
import bfu2 from '../static/bfu2.jpg'
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
import author1 from '../static/authors/author1.jpg'
import author2 from '../static/authors/author2.jpg'
import author3 from '../static/authors/author3.jpg'
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
            <li>
              <a href='#gako'>ГАКО</a>
            </li>
            <li>
              <a href='#authors'>Авторы проекта</a>
            </li>
            <li>
              <a href='#how-to-create'>Оцифровка</a>
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
            <div
              className='landing-text white-scroll'
              style={{ textAlign: 'justify', fontSize: 20 }}
            >
              В системе исторических источников периодическая печать закономерно
              занимает существенное место. Редкое историческое исследование
              событий, явлений, фактов нового и новейшего времени обходится без
              обращения к материалам периодики. Создание базы данных материалов
              газеты «Калининградская правда» за 1946-1991 гг., и размещение
              этих материалов в открытом для пользователей сетевом ресурсе
              он-лайн архива региональной прессы советского периода весьма
              перспективная задача. Проект дает возможность участия в нем
              студентов, магистрантов, аспирантов и опытных
              исследователей-преподавателей. Наконец электронный формат и
              открытость доступа позволяет привлечь внимание к источнику и
              возможностям работы с ним всех желающих, любителей истории и
              краеведов.
            </div>
          </div>
        </div>
      </Container>
      <Container className='landing-container' id='authors'>
        <h2>Авторы проекта</h2>
        <Row>
          <Col md={3} sm={6}>
            <div className='author'>
              <img src={author1} alt='Баранова Елена Вячеславовна' />
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
              <img src={author2} alt='Маслов Виталий Николаевич' />
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
              <img src={author3} alt='Данилин Александр Николаевич' />
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
      <Container className='landing-container' id='gako'>
        <h2>Государственный архив Калининградской области</h2>
        <div className='content'>
          <div className='text'>
            <div
              className='landing-text'
              style={{ textAlign: 'justify', fontSize: 20 }}
            >
              Электронный накапливаемый ресурс «Калининградская правда» создан
              БФУ им. И. Канта (НИЦ социально-гуманитарной информатики)
              совместно с Государственным архивом Калининградской области.
              <br />
              <br />
              Для наполнения онлайн-архива оцифрована и переведена в
              редактируемый формат хранящаяся в Государственным архивом
              Калининградской области коллекция региональной газеты
              «Калининградская правда» за 1946–1991 годы.
              <br />
              <br />
              <a href='https://gako.gov39.ru/' target='_blank'>
                Государственный архив Калининградской области
              </a>
            </div>
          </div>
          <img
            src={bfu2}
            alt='БФУ'
            className='landing-img'
            style={{
              marginLeft: 30,
            }}
          />
        </div>
      </Container>
      <div className='landing-delimiter'>
        <Row>
          <Col md={6} sm={12}>
            <div className='top'>45</div>
            <div className='bottom'>Лет охватывает архив</div>
          </Col>
          <Col md={6} sm={12}>
            <div className='top'>103000</div>
            <div className='bottom'>Выпусков опубликовано</div>
          </Col>
          {/* <Col md={4} sm={12}>
            <div className='top'>20</div>
            <div className='bottom'>Лет сотрудничаем с БФУ имени Канта</div>
          </Col> */}
        </Row>
      </div>
      <Container className='landing-container' id='how-to-create'>
        <h2>Оцифровка</h2>
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
            <Col className='instruction-item' md={6} sm={12}>
              <div className='square'>
                <div className='top'>1</div>
                <div className='bottom'>Пройти регистрацию</div>
              </div>
            </Col>
            <Col className='instruction-item' md={6} sm={12}>
              <div className='square'>
                <div className='top'>2</div>
                <div className='bottom'>Пользоваться архивом</div>
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
