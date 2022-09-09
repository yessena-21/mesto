export default class Api {
    constructor({ baseUrl, headers }) {
        this.link = baseUrl;
        this.headers = headers;
    }
    getUserInfo() {
        return fetch(`${this.link}users/me`, {
            method: 'GET',
            headers: this.headers
        })
            .then(this._getResponseData)
    }

    setUserInfo(data) {
        return fetch(`${this.link}users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData)
    }

    getInitialCards() {
        return fetch(`${this.link}cards`, {
            headers: this.headers
        })

            .then(this._getResponseData)

    }

    editAvatar(data) {
        console.log(data);
        return fetch(`${this.link}users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
        })

            .then(this._getResponseData)
    }

    createCard(newCard) {
        return fetch(`${this.link}cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            })
        })
            .then(this._getResponseData)
    }

    deleteCard(id) {
        return fetch(`${this.link}cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    likeCard(id) {
        return fetch(`${this.link}cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    dislikeCard(id) {
        return fetch(`${this.link}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

}