import React from 'react';
import Header from '../Header/Header';
import MoviesHeader from '../Header/MoviesHeader/MoviesHeader';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <>
      <Header location={"/saved-movies"}>
        <MoviesHeader />
      </Header>
      <section className="movies">
        <SearchForm
          form={props.form}
          checkbox={props.checkbox}
          onChange={props.onChange}
          onInputClick={props.onInputClick}
          onSubmit={props.onSubmit}
          errorInput={props.errorInput}
        />
        <MoviesCardList
          location={'/saved-movies'}
          load={props.load}
          cards={props.cards}
          error={props.error}
          limit={props.limit}
          onDeleteClick={props.onDeleteClick}
        />
        <Footer />
      </section>
    </>
  );
}

export default SavedMovies;
