import React from 'react';
import Header from '../Header/Header';
import MainMovies from '../Header/MoviesHeader/MoviesHeader';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header location={"/movies"}>
        <MainMovies />
      </Header>
      <section className="movies">
        <SearchForm
          onSubmit={props.onSubmit}
          onChange={props.onChange}
          error={props.error}
          form={props.form}
          checkbox={props.checkbox}
          onInputClick={props.onInputClick}
          errorInput={props.errorInput}
        />
        <MoviesCardList
          load={props.load}
          liked={props.liked}
          onLikedClick={props.onLikedClick}
          location={'/movies'}
          loadMore={props.loadMore}
          cards={props.cards}
          error={props.error}
          limit={props.limit}
          onClick={props.onClick}
        />
        <Footer />
      </section>
    </>
  );
}

export default Movies;

