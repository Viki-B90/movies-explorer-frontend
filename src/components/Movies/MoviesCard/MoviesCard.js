import React from 'react'
import './MoviesCard.css'

const MoviesCard = (props) => {

  function handleLikedClick() {
    props.onLikedClick(props.movie.id);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.movie.id);
  }

  function getTimeFromMins(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  const liked = props.movie.liked;
  const cardLikeButtonClassName = `elements__like${liked ? '_active' : ''}`

  return (
    <section className="elements">
      <li className="elements__item">
        <div className="elements__text">
          <h5 className="elements__title">{props.movieName}</h5>
          <span className="elements__time">{getTimeFromMins(props.movieTime)}</span>
        </div>
        {(props.location === "/movies") && (
          <>
            <button aria-label="Лайк" type="button" className={cardLikeButtonClassName} onClick={handleLikedClick}></button>
            <div className="elements__img-container">
              <a href={props.movieVideo} target="_blank" rel="noreferrer">
                <img className="elements__image" src={`https://api.nomoreparties.co${props.movieLink}`} alt={props.movieName} />
              </a>
            </div>
          </>
        )}
        {(props.location === "/saved-movies") && (
          <>
            <button aria-label="Лайк" type="button" className="elements__like_delete" onClick={handleDeleteClick}></button>
            <div className="elements__img-container">
              <a href={props.movieVideo} target="_blank" rel="noreferrer">
                <img className="elements__image" src={props.movieImg} alt={props.movieName} />
              </a>
            </div>
          </>
        )}
      </li>
    </section>
  )
};

export default MoviesCard;
