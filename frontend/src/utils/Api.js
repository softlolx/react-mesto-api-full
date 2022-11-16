class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Упс, да у вас тут ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, { headers: this._headers }).then(this.handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, { headers: this._headers }).then(this.handleResponse);
  }

  setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then(this.handleResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this.handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.handleResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this.handleResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.handleResponse);
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.handleResponse);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47/",
  headers: {
    authorization: "0fb97600-e542-48f7-932b-9df7c5fc21d8",
    "Content-Type": "application/json",
  },
});
