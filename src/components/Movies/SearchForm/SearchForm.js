import React from 'react';
import zoom from '../../../images/icon-zoom.svg';
import zoomBlue from '../../../images/icon-zoom-blue.svg';
import './SearchForm.css';

function SearchForm(props) {

  const checkedInputClassName = `checkbox__input checkbox__input${props.checkbox ? '_checked' : ''}`

  return (
    <section className="form">
      <div className="form__container">
        <form onSubmit={props.onSubmit} noValidate>
          <img src={zoom} alt="Лупа" className="form__zoom" />
          <input onChange={props.onChange} value={props.form || ''} className="form__input" placeholder='Фильм' name="film" type="text" id="film" autoComplete="off" required/>
          <div id="film-error" className="error__input">{props.errorInput}</div>
          <button type="submit" className="form__button">
            <img src={zoomBlue} alt="Найти" className="form__find" />
          </button>
        </form>
        <label className="checkbox">
          <input type="checkbox" onClick={props.onInputClick} className={checkedInputClassName} />
          <span className="checkbox__checkmark"></span>
          <span className="checkbox__text">Короткометражки</span>
        </label>
      </div>
    </section>
  )
}

export default SearchForm;
