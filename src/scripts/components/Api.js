export default class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getInitialCards() {
       return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            }
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    editUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method : 'PATCH',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                name: name,
                about: about
            })
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    addCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method : 'POST',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                name : name,
                link : link
            })
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }
}