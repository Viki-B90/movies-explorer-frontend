/* eslint-disable react/prop-types */
import React from 'react'
import './MoviesCard.css'

const MoviesCard = (props) => {
  const [liked, setLiked] = React.useState(false);

  function handleLikedClick() {
    setLiked((prev) => !prev)
  }

  const cardLikeButtonClassName = `elements-grid__like${liked ? '_active' : ''}`
  return (
    <section className="card">
      <li className="elements-grid__item">
        <div className="elements-grid__text">
          <h5 className="elements-grid__title">{props.movieName}</h5>
          <span className="elements-grid__time">{props.movieTime}</span>
          <button aria-label="Лайк" type="button" className={cardLikeButtonClassName} onClick={handleLikedClick}></button>
        </div>
        <div className="elements-grid__img-container">
          <img className="elements-grid__image" src={props.movieLink} alt={props.movieName} />
        </div>
      </li>
    </section>
  )
};

export default MoviesCard;
