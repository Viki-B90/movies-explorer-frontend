import React from 'react';
import Header from '../../Header/Header';
import './Promo.css';
import promo from '../../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <Header location={"/"}/>
      <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
      <img src={promo} alt="Рисунок Promo" className="promo__logo"  />
      <nav className="promo__links">
        <a href="#project" className="promo__link">О проекте</a>
        <a href="#techs" className="promo__link">Технологии</a>
        <a href="#student" className="promo__link">Студент</a>
      </nav>
    </section>
  )
}

export default Promo;
