import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

function Header({ location, color, children }) {
  return (
    <header className={`header ${color}`}>
      <section className={`header__links ${location}`}>
        <Link to="/"><img src={logo} alt="Логотип" className="header__logo" /></Link>
          {children}
      </section>
    </header>
  )
}

export default Header;
