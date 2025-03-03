export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch((err) => {
        console.error("Error fetching cards", err);
      });
  }

  getUserInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userData, cards]) => {
        return {
          userData,
          cards,
        };
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }

  updateUserProfile(id, data) {
    return fetch(`${this._baseUrl}/users/${id}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch((err) => console.error(err));
  }

  getNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._handleResponse)
      .catch((err) => {
        console.error(err);
      });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch((err) => {
        console.error(err);
      });
  }

  changeLikeStatus(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then((data) => {
        console.log("Like status updated:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error updating status", err);
      });
  }
}
