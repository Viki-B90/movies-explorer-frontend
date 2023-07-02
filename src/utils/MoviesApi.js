class Api {
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //получение списка фильмов
  getAllMovies(){
  return fetch ( `${this._url}/beatfilm-movies`, {
    method: 'GET',
    headers:  this._headers,
  })
  .then(this._checkResponse)
  }
}

const apiMovies = new Api({
  url: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
    }
});

export default apiMovies;
