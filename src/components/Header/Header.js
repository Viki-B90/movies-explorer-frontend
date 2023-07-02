import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import img from '../../images/icon-people.svg';
import './Header.css';

function Header(props) {
  const [actived, setActived] = React.useState(false);

  function handleActiveClick() {
    setActived((prev) => !prev)
  }
  const activeButtonClassName = `header__menu${actived ? '_active' : ''}`

  return (
    <>
      <header className="header">
        <section className={activeButtonClassName}>
          <button className="header__close" onClick={handleActiveClick}></button>
          <div className="header__sidebar">
            <div className="header__sidebar-links">
              <Link to="/" className="header__sidebar-main">Главная</Link>
              <Link to="/movies" className="header__sidebar-movies">Фильмы</Link>
              <Link to="/saved-movies" className="header__sidebar-saved">Сохранённые фильмы</Link>
            </div>
            <div className="header__sidebar-profile">
              <Link to="/profile" >
                <button className="header__sidebar-button">Аккаунт
                  <img src={img} alt="Аккаунт" className="header__sidebar-img" />
                </button>
              </Link>
            </div>
          </div>
        </section>
        {props.location === "/" && (
          <section className="header__links">
            <Link to="/"><img src={logo} alt="Логотип" className="header__logo" /></Link>
            <div className="header__button">
              <Link to="/signup"><button className="header__button_signup">Регистрация</button></Link>
              <Link to="/signin"><button className="header__button_signin">Войти</button></Link>
            </div>
          </section>
        )}
        {(props.location === "/movies" || props.location === "/saved-movies" || props.location === "/profile") && (
          <section className="header__links">
            <Link to="/"><img src={logo} alt="Логотип" className="header__logo" /></Link>
            <div className='header__link'>
              <Link to="/movies" className="header__link-movies">Фильмы</Link>
              <Link to="/saved-movies" className="header__link-saved">Сохранённые фильмы</Link>
            </div>
            <div className="header__link-profile">
              <Link to="/profile" >
                <button className="header__button_profile">Аккаунт
                  <img src={img} alt="Аккаунт" className="header__img" />
                </button>
              </Link>
              <button className="header__burger" onClick={handleActiveClick}></button>
            </div>
          </section>
        )}
      </header>
    </>
  );
}

export default Header;
