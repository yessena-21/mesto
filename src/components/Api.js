export default class Api {
    constructor(baseURL, token) {
        this._token = token;
        this._link = baseURL;
    }
    getUserInfo() {
        fetch(`${this._link}users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
            .then((res) => {
                if (res.ok) {
                    console.log(res.ok);
                    return res.json();

                }
            })
        // .then((result) => {
        //     console.log(result);
        // });
    }

    setUserInfo(data) {
        fetch(`${this._link}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
        if (res.ok)
            return res.json()
        return Promise.reject(`Ошибка: $(res.status`)
    }

    getCardsArray() {

        fetch(`${this._link}cards`, {
            headers: {
                authorization: this._token
            }
        })

            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                //return Promise.reject(`Ошибка: ${res.status}`);
                console.log(' чет не так!!!');
            });
    }

    editAvatar() {
        fetch(`${this._link}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link: data.link
            })
        })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });

    }
}