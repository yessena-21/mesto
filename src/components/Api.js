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
            .then((res) => {
                if (res.ok)
                    return res.json();

                return Promise.reject(`Ошибка: $(res.status`)
            })
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
            .then((res) => {
                if (res.ok)
                    return res.json();

                return Promise.reject(`Ошибка: $(res.status`)
            })
    }

    getInitialCards() {
        return fetch(`${this.link}cards`, {
            headers: this.headers
        })

            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);

            });

    }

    editAvatar(data) {
        console.log(data);
        return fetch(`${this.link}users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
            })
        
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);


            })
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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);


            })
    }

    deleteCard(id) {
        return fetch(`${this.link}cards/${id}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);


            })
    }

    likeCard(id) {
        return fetch(`${this.link}cards/likes/${id}`, {
                method: 'PUT',
                headers: this.headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);


            })
    }

    dislikeCard(id) {
        return fetch(`${this.link}cards/likes/${id}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);


            })
    }

}