import React from 'react';
import Header from '../../Header/Header';
import zoom from '../../../images/icon-zoom.svg';
import zoomBlue from '../../../images/icon-zoom-blue.svg';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="form">
      <Header location={"/movies"} />
      <div className="form__container">
        <img src={zoom} alt="Лупа" className="form__zoom" />
        <input className="form__input" placeholder='Фильм' required />
        <button className='form__button'>
          <img src={zoomBlue} alt="Найти" className="form__find" />
        </button>
        <label className="checkbox">
          <input type="checkbox" className="checkbox-input" />
          <span className="checkbox__checkmark"></span>
          <span className="checkbox__text">Короткометражки</span>
        </label>
      </div>
    </div>
  )
}

export default SearchForm;
