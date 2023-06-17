/* eslint-disable react/jsx-key */
import React from 'react';
import { useState, useEffect } from 'react';
import { initialMovies } from '../../../utils/array'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'

const MoviesCardList = () => {
  const size = useWindowSize();

  function useWindowSize() {
        const [windowSize, setWindowSize] = useState(undefined);
        useEffect(() => {
          function handleResize() {
            setWindowSize(window.innerWidth);
          }
          window.addEventListener("resize", handleResize);
          handleResize();
          return () => window.removeEventListener("resize", handleResize);
        }, []);
        return windowSize;
  }
  return (
    <section className="movies-cards">
      <ul className="movies-list">
        {size > 880 &&
        (initialMovies.slice(0,7).map(movie => {
          return (
            <MoviesCard
              movieName={movie.name}
              movieLink={movie.link.img}
              movieTime={movie.time}
              movie={movie}
              movieLiked={movie.like}
            />
          )
        }))}
        { size > 600 && size <= 880 && (
          initialMovies.slice(0,7).map(movie => {
            return (
              <MoviesCard
                movieName={movie.name}
                movieLink={movie.link.img}
                movieTime={movie.time}
                movie={movie}
                movieLiked={movie.like}
              />
            )
          })
        )}
        { size <= 600  && (
          initialMovies.slice(0,5).map(movie => {
            return (
              <MoviesCard
                movieName={movie.name}
                movieLink={movie.link.img}
                movieTime={movie.time}
                movie={movie}
                movieLiked={movie.like}
              />
            )
          })
        )}
      </ul>
    </section>
  )
};

export default MoviesCardList;
