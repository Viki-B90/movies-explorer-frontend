import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Login.css';

function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <Link to="/"><img src={logo} alt="Логотип" className="login__logo" /></Link>
        <p className="login__welcome">Рады видеть!</p>
        <form className="login__form">
          <span className="login__text">E-mail</span>
          <input
            id="email"
            name="email"
            type="email"
            className="login__input"
          />
          <span className="login__text">Пароль</span>
          <input
            id="password"
            name="password"
            type="password"
            className="login__input"
          />
          <div className="login__button-container">
            <button type="submit" className="login__link">Войти</button>
          </div>
        </form>
        <div className="login__signup">
          <p>Еще не зарегистрированы? <Link to="/signup" className="login__login-link"> Регистрация</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login;
