class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //регистрация
  register = (name, email, password) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(this._checkResponse)
    .then((res) => res)
  };

  //авторизация
  authorize = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._checkResponse)
  };

  //проверка токена
  checkToken = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    .then(data => data)
  }

  //получение данных пользователя
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
  }

  //редактирования профиля
  editUserInfo(user, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email
      })
    })
    .then(this._checkResponse)
  }

  //добавление фильма
  addMovie(movies, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: movies.country,
        director: movies.director,
        duration: movies.duration,
        year: movies.year,
        description: movies.description,
        image: `https://api.nomoreparties.co${movies.image.url}`,
        trailerLink: movies.trailerLink,
        nameRU: movies.nameRU,
        nameEN: movies.nameEN,
        thumbnail: movies.thumbnail,
        id: movies.id,
        liked: movies.liked,
      }),
    })
    .then(this._checkResponse)
  }

  //удаление фильма
  removeMovie(_id, token) {
    return fetch(`${this._url}/movies/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(this._checkResponse)
  }

  //получение сохраненных фильмов
  getAllSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  url: 'https://api.movies.viki.b.nomoredomains.rocks',
  //url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
