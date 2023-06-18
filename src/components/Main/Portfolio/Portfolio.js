import React from 'react';
import './Portfolio.css';
import img from '../../../images/font-main.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h5 className="portfolio__header">Портфолио</h5>
      <ul className="portfolio__list">
        <li className="portfolio__list-text">
          <a href="https://github.com/Viki-B90/how-to-learn" target="_blank" className="portfolio__link" rel="noreferrer">Статичный сайт
            <img src={img} alt="Стрелка" className="portfolio__img" />
          </a>
        </li>
        <li className="portfolio__list-text">
          <a href="https:viki-b90.github.io/russian-travel" target="_blank" className="portfolio__link" rel="noreferrer">Адаптивный сайт
            <img src={img} alt="Фотография" className="portfolio__img" />
          </a>
        </li>
        <li className="portfolio__list-text">
          <a href="https://viki-b90.github.io/mesto-react" target="_blank" className="portfolio__link" rel="noreferrer">Одностраничное приложение
            <img src={img} alt="Фотография" className="portfolio__img" />
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
