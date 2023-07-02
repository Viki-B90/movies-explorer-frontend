import React from 'react'
import './MoreMoviesCard.css'

const MoreMoviesCard = (props) => {
  const moreMovies = `moremovies${props.loadMore ? '_active' : ''}`

  return (
    <>
      { props.location === "/movies" && (
      <section className={moreMovies}>
        <button className="moremovies__button" onClick={props.onClick}>Ещё</button>
      </section>
      )
      }
      { props.location === "/saved-movies" && (
      <section className="moremovies">
        <div className="moremovies__container"></div>
      </section>
      )
      }
    </>
  )
};

export default MoreMoviesCard;
