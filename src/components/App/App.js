import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { MOVIES_CHECKED, WINDOW_SIZE, CARDS_RENDER_DESKTOP, CARDS_RENDER_MOBILE } from '../../utils/constants';
import apiMovies from '../../utils/MoviesApi.js';
import api from '../../utils/MainApi.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [form, setForm] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorInput, setInputError] = React.useState('');
  const [errorInputSaved, setInputErrorSaved] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [shortMovie, setShortMovie] = React.useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [limit, setLimit] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [shortSavedMovie, setShortSavedMovie] = React.useState([]);
  const [formSaved, setFormSaved] = React.useState('');
  const [checkedSaved, setCheckedSaved] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const size = useWindowSize();
  const jwt = localStorage.getItem('jwt');
  const PAGE_WITHOUT_AUTH = ['/signin', '/signup'];

  window.onload = function () {
    setTimeout (function() {
      setLoad(true);
    }, 2000);
  }

  useEffect(() => {
    handleTokenCheck(location.pathname);
  }, []);

  //проверяем токен пользователя
  function handleTokenCheck(path) {
    if (!loggedIn && localStorage.getItem('jwt') && PAGE_WITHOUT_AUTH.includes(path)) {
      navigate('/');
    } else{
      const jwt = localStorage.getItem('jwt');
      api.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(path);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //вход по логину
  const handleLogin = (data) => {
    console.log(data)
    api.authorize(data.email, data.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies');
          handleGetAllMovies();
        } else {
          setInfoTooltipOpen(true);
          setInfoTooltip(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
      });
  };

  //вход по регистрации
  const handleRegister = (data) => {
    api.register(data.name, data.email, data.password)
      .then((res) => {
        if (res) {
          setInfoTooltipOpen(true);
          setInfoTooltip(true);
          handleLogin(data);
          setInfoTooltip(true);
        } else {
          console.log('Ошибка регистрации!');
          setInfoTooltipOpen(true);
          setInfoTooltip(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
      });
  };

  //удаляем пользователя при выходе
  const handleLogout = (evt) => {
    evt.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('status');
    localStorage.removeItem('saved');
    localStorage.removeItem('liked');
    localStorage.removeItem('cards');
    setCards([]);
    setForm('');
    setChecked(false);
    setSavedCards([]);
    setLoggedIn(false);
    setFormSaved('');
    setCheckedSaved(false);
    navigate('/')
  }

  //редактирование профиля
  function handleUpdateUser(data) {
    api.editUserInfo(data, jwt)
      .then((dataUser) => {
        if (dataUser) {
          setInfoTooltipOpen(true);
          setInfoTooltip(true);
          setCurrentUser(dataUser);
        } else {
          setInfoTooltipOpen(true);
          setInfoTooltip(false);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
      })
  }

  //отслеживаем размер экрана
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState(undefined);
    useEffect(() => {
      function handleResize() {
        setWindowSize(window.innerWidth);
        if (window.innerWidth > WINDOW_SIZE) {
          setLimit(CARDS_RENDER_DESKTOP)
        } else setLimit(CARDS_RENDER_MOBILE)

      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  //загружаем больше карточек
  function addMoreMovies() {
      if (size > WINDOW_SIZE) {
        setLimit((prevLimit) => prevLimit + CARDS_RENDER_DESKTOP);
        if (limit + CARDS_RENDER_DESKTOP < cards.length) {
          setLoadMore(false);
      } else {
        setLoadMore(true);
      }
      } else {
        setLimit((prevLimit) => prevLimit + CARDS_RENDER_MOBILE);
        if (limit + CARDS_RENDER_MOBILE < cards.length) {
          setLoadMore(false);
      } else {
        setLoadMore(true);
      }
      }
  }

  //меняем форму
  const handleChange = (event) => {
    setForm(event.target.value);
    if (!event.target.value) {
      setInputError('Нужно ввести ключевое слово')
    } else {
      setInputError('')
    }
  };

  //получаем все карточки
  function handleGetAllMovies() {
    apiMovies.getAllMovies()
      .then((cards) => {
        localStorage.setItem('cards', JSON.stringify(cards.map((cards) => {
          return {
            country: cards.country,
            description: cards.description,
            director: cards.director,
            duration: cards.duration,
            id: cards.id,
            image: cards.image,
            nameEN: cards.nameEN,
            nameRU: cards.nameRU,
            trailerLink: cards.trailerLink,
            year: cards.year,
            liked: false
          }
        })
        ))
      })
      .catch((err) => {
        console.log(err);
        setError('Во время запроса произошла ошибка.Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
  }

  //форма поиска
  function handleSubmit(event) {
    event.preventDefault();
    const movies = JSON.parse(localStorage.getItem('cards'))
    const moviesFilter = movies.filter(card => card.nameRU.toUpperCase().indexOf(form.toUpperCase()) !== -1)
    setCards(moviesFilter)
    localStorage.setItem('liked', JSON.stringify(moviesFilter));
    localStorage.setItem('status', JSON.stringify({
      'movies': moviesFilter,
      'checked': checked,
      'form': form
    }))
    if (moviesFilter.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
    if (moviesFilter.length <= limit) {
      setLoadMore(true);
    } else {
      setLoadMore(false);
    }
  }

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem('status'));
    if (data === null) {
      setCards([])
      setChecked(false)
      setForm('')
    } else {
      setCards(data.movies)
      setChecked(data.checked)
      setForm(data.form)
      const likedCard = JSON.parse(localStorage.getItem('liked'));
      if (likedCard === null) {
        setCards(data.movies);
      } else setCards(likedCard);
    }
  }, []);

  React.useEffect(() => {
    const moviesChecked = cards.filter(card => card.duration <= MOVIES_CHECKED)
    setShortMovie(moviesChecked)
  }, [cards, setChecked]);

  function handleCheckedClick() {
    setChecked((prev) => !prev)
    localStorage.setItem('status', JSON.stringify({
      'movies': cards,
      'checked': !checked,
      'form': form
    }))
  }

  //форма сохраненных фильмов
  const handleChangeSaved = (event) => {
    setFormSaved(event.target.value);
    if (!event.target.value) {
      setInputErrorSaved('Нужно ввести ключевое слово')
    } else {
      setInputError('')
    }
  }

  //поиск сoхраненных фильмов
  function handleSubmitSavedMovies(event) {
    event.preventDefault();
    const savedMovies = JSON.parse(localStorage.getItem('saved'));
    const moviesFilter = savedMovies.filter(card => card.nameRU.toUpperCase().indexOf(formSaved.toUpperCase()) !== -1);
    setSavedCards(moviesFilter);
    if (moviesFilter.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }

  React.useEffect(() => {
    setShortSavedMovie(savedCards.filter(card => card.duration <= MOVIES_CHECKED))
  }, [savedCards, setCheckedSaved]);

  function handleCheckedClickSaved() {
    setCheckedSaved((prev) => !prev)
  }

  //лайк/удаление фильма
  function handleAddMovie(id) {
    const movies = JSON.parse(localStorage.getItem('cards'))
    const cardLiked = cards.find((card) => card.id === id)
    if (cardLiked.liked === true) {
      setCards(
        cards.map((card) =>
          card.id === id ? { ...card, liked: false } : card,
        )
      )
      localStorage.setItem('liked', JSON.stringify(cards.map((card) =>
        card.id === id ? { ...card, liked: false } : card,
      )));
      localStorage.setItem('cards', JSON.stringify(movies.map((card) =>
        card.id === id ? { ...card, liked: false } : card,
      )));
      localStorage.setItem('saved', JSON.stringify(movies.map((card) =>
        card.id === id ? { ...card, liked: false } : card,
      )));
      const savedMoviesFilter = savedCards.find(card => card.id === id)
      api.removeMovie(savedMoviesFilter._id, jwt)
        .then(() => {
          setSavedCards((state) => state.filter((c) => c._id !== savedMoviesFilter._id));
          localStorage.setItem('saved', JSON.stringify((state) => state.filter((c) => c._id !== savedMoviesFilter._id)));
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    } else {
      setCards(
        cards.map((card) =>
          card.id === id ? { ...card, liked: true } : card
        )
      );
      localStorage.setItem('liked', JSON.stringify(cards.map((card) =>
        card.id === id ? { ...card, liked: true } : card,
      )));
      localStorage.setItem('cards', JSON.stringify(movies.map((card) =>
        card.id === id ? { ...card, liked: true } : card,
      )));
      api.addMovie(cardLiked, jwt)
        .then((newCard) => {
          setSavedCards([newCard, ...savedCards]);
          localStorage.setItem('saved', JSON.stringify([newCard, ...savedCards]));
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    }
  }

  //удаление сохраненного фильма
  function handleDeleteMovie(id) {
    const movies = JSON.parse(localStorage.getItem('cards'))
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, liked: false } : card
      )
    )
    localStorage.setItem('liked', JSON.stringify(cards.map((card) =>
      card.id === id ? { ...card, liked: false } : card,
    )));
    localStorage.setItem('cards', JSON.stringify(movies.map((card) =>
      card.id === id ? { ...card, liked: false } : card,
    )));
    const savedMoviesFilter = savedCards.find(card => card.id === id)
    api.removeMovie(savedMoviesFilter._id, jwt)
      .then(() => {
        setSavedCards((state) => state.filter((c) => c._id !== savedMoviesFilter._id));
        localStorage.setItem('saved', JSON.stringify((state) => state.filter((c) => c._id !== savedMoviesFilter._id)));
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleSearchLikedCards([user, cards]) {
    const movies = JSON.parse(localStorage.getItem('cards'))
    console.log(movies)
    localStorage.setItem('cards', JSON.stringify(movies.map((movie) => {
      if (cards.filter(card => card.owner === user._id).find((saved) => movie.id === saved.id)) {
        return { ...movie, liked: true }
      } else return movie
    }
    )));
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(jwt),
        api.getAllSavedMovies(jwt)
      ])
        .then(([user, cards]) => {
          console.log(user);
          setCurrentUser(user);
          setSavedCards(cards.filter(card => card.owner === user._id));
          localStorage.setItem('saved', JSON.stringify(cards.filter(card => card.owner === user._id)));
          handleSearchLikedCards([user, cards]);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="app">
        <div className="app__container">
          <Routes>
            <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
            <Route exact path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  load={load}
                  onChange={handleChange}
                  error={error}
                  form={form}
                  cards={checked ? shortMovie : cards}
                  onSubmit={handleSubmit}
                  checkbox={checked}
                  onInputClick={handleCheckedClick}
                  loadMore={loadMore}
                  onClick={addMoreMovies}
                  limit={limit}
                  onLikedClick={handleAddMovie}
                  errorInput={errorInput}
                />
              </ProtectedRoute>}
            />
            <Route exact path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                load={load}
                cards={checkedSaved ? shortSavedMovie : savedCards}
                limit={limit}
                error={error}
                form={formSaved}
                checkbox={checkedSaved}
                onChange={handleChangeSaved}
                onInputClick={handleCheckedClickSaved}
                onSubmit={handleSubmitSavedMovies}
                onDeleteClick={handleDeleteMovie}
                errorInput={errorInputSaved}
              />
              </ProtectedRoute>}
            />
            <Route exact path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                onLogout={handleLogout}
                onEditProfile={handleUpdateUser}
                onInfoTooltip={infoTooltip}
                infoTooltipOpen={infoTooltipOpen} />
              </ProtectedRoute>}
            />
            <Route exact path="/signup" element={
              <Register
                onRegister={handleRegister}
                onInfoTooltip={infoTooltip}
                infoTooltipOpen={infoTooltipOpen} />}
            />
            <Route exact path="/signin" element={
              <Login
                onLogin={handleLogin}
                onInfoTooltip={infoTooltip}
                infoTooltipOpen={infoTooltipOpen} />}
            />
            <Route exact path="*" element={<PageNotFound loggedIn={loggedIn}/>} />
          </Routes>
        </div>
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
