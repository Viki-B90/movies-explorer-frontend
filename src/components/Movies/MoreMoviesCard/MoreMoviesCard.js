/* eslint-disable react/prop-types */
import React from 'react'
import './MoreMoviesCard.css'

const MoreMoviesCard = (props) => {
  return (
    <>
      { props.location === "/movies" && (
      <section className="moremovies">
        <button className="moremovies__button">Ещё</button>
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
