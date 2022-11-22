class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      const response = res.json();
      console.log(response);
      return response;
    } else {
      return Promise.reject(`Упс, да у вас тут ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers, credentials: 'include' }).then(
      this.handleResponse,
    );
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers, credentials: 'include' }).then(
      this.handleResponse,
    );
  }

  setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
      credentials: 'include',
    }).then(this.handleResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(this.handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this.handleResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
      credentials: 'include',
    }).then(this.handleResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then(this.handleResponse);
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this.handleResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto-softlolx.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  },
});
