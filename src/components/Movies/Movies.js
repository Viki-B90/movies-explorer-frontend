import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
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
          liked={props.liked}
          onLikedClick={props.onLikedClick}
          location={'/movies'}
          loadMore={props.loadMore}
          cards={props.cards}
          error={props.error}
          limit={props.limit}
          onClick={props.onClick}
          load={props.load}
        />
        <Footer />
      </section>
    </>
  );
}

export default Movies;

