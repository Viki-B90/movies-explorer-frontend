/* eslint-disable react/prop-types */
import React from 'react'
import './MoviesCard.css'

const MoviesCard = (props) => {
  const [liked, setLiked] = React.useState(false);

  function handleLikedClick() {
    setLiked((prev) => !prev)
  }

  const cardLikeButtonClassName = `elements__like${liked ? '_active' : ''}`
  return (
    <section className="elements">
      <li className="elements__item">
        <div className="elements__text">
          <h5 className="elements__title">{props.movieName}</h5>
          <span className="elements__time">{props.movieTime}</span>
          <button aria-label="Лайк" type="button" className={cardLikeButtonClassName} onClick={handleLikedClick}></button>
        </div>
        <div className="elements__img-container">
          <img className="elements__image" src={props.movieLink} alt={props.movieName} />
        </div>
      </li>
    </section>
  )
};

export default MoviesCard;
