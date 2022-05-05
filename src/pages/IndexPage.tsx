import { FC } from 'react'
import { Link } from 'react-router-dom'
import logo from '../static/logo.svg'

export const IndexPage: FC = () => {
  return (
    <>
      <header>
        <div className='logo-container'>
          <Link to={'/'}>
            <img src={logo} alt='logo' className='logo' />
            <span>Архив газет Калининградской области</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}>О проекте</Link>
            </li>
            <li>
              <Link to={'/'}>Миссия</Link>
            </li>
            <li>
              <Link to={'/'}>Инструкции</Link>
            </li>
            <li>
              <Link to={'/'}>Связаться с нами</Link>
            </li>
          </ul>
        </nav>
        <div className='quote'>
          Гордиться славою своих предков не только можно, но и должно; не
          уважать оной есть постыдное малодушие!
        </div>
      </header>
    </>
  )
}
