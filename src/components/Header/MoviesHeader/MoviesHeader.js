import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MoviesHeader.css';
import img from '../../../images/icon-people.svg';

function MoviesHeader() {
  const [actived, setActived] = React.useState(false);

  function handleActiveClick() {
    setActived((prev) => !prev)
  }
  const activeButtonClassName = `header__menu${actived ? '_active' : ''}`

  return (
    <>
      <section className="header__links-profile">
        <nav id="links" className='header__link'>
          <NavLink to="/movies" className="header__link-movies">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="header__link-saved">Сохранённые фильмы</NavLink>
        </nav>
        <nav className="header__link-profile">
          <Link to="/profile" >
            <button className="header__button_profile">Аккаунт
              <img src={img} alt="Аккаунт" className="header__img" />
            </button>
          </Link>
          <button className="header__burger" onClick={handleActiveClick}></button>
        </nav>
      </section>

      <section className={activeButtonClassName}>
        <button className="header__close" onClick={handleActiveClick}></button>
        <div className="header__sidebar">
          <nav id="sidebar" className="header__sidebar-links">
            <NavLink to="/" className="header__sidebar-main">Главная</NavLink>
            <NavLink to="/movies" className="header__sidebar-movies">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="header__sidebar-saved">Сохранённые фильмы</NavLink>
          </nav>
          <nav className="header__sidebar-profile">
            <Link to="/profile" >
              <button className="header__sidebar-button">Аккаунт
                <img src={img} alt="Аккаунт" className="header__sidebar-img" />
              </button>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}

export default MoviesHeader;
