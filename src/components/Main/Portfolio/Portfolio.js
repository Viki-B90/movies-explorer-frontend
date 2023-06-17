import React from 'react';
import './Portfolio.css';
import img from '../../../images/font-main.svg';

function Portfolio() {
  return (
    <div className="portfolio">
      <h5 className="portfolio__header">Портфолио</h5>
      <ul className="portfolio__list">
        <li className="portfolio__list-text">
          <a href="https://github.com/Viki-B90/how-to-learn" target="_blank" className="portfolio__link" rel="noreferrer">Статичный сайт</a>
          <img src={img} alt="Стрелка" className="portfolio__img" />
        </li>
        <li className="portfolio__list-text">
          <a href="https:viki-b90.github.io/russian-travel" target="_blank" className="portfolio__link" rel="noreferrer">Адаптивный сайт</a>
          <img src={img} alt="Фотография" className="portfolio__img" />
        </li>
        <li className="portfolio__list-text">
          <a href="https://viki-b90.github.io/mesto-react" target="_blank" className="portfolio__link" rel="noreferrer">Одностраничное приложение</a>
          <img src={img} alt="Фотография" className="portfolio__img" />
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;
