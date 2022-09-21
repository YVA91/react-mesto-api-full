class Api {
  constructor(url) {
    this._url = url;
  }
  


  _report(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
      }
    })
      .then(this._report)
  }

  getCreateCard() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "content-type": "application/json",
      }
    })
      .then(this._report)
  }

  putLike(cardsId) {
    return fetch(`${this._url}/cards/${cardsId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(this._report)
  }

  deleteLike(cardsId) {
    return fetch(`${this._url}/cards/${cardsId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(this._report)
  }

  deletePhoto(dataid) {
    return fetch(`${this._url}/cards/${dataid}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(this._report)
  }

  patchUserInfo(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(this._report)
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._report)
  }

  postNewPhoto(name, link) {
    return fetch(`${this._url}/cards `, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
    })
      .then(this._report)
  }
}

export const api = new Api ('https://api.yva.mesto.nomoredomains.sbs' || 'http://localhost:3000')








