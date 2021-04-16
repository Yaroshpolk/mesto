export default class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    // Получение постов с сервера
    getInitialCards() {
       return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            }
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    // Получение информации о пользователе
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    // Изменение данных о пользователе
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

    // Изменение аватара пользователя
    changeAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method : 'PATCH',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                avatar : link
            })
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    // Добавление поста
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method : 'POST',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                name : data.name,
                link : data.link
            })
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    // Удаление поста
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    // Добавление лайка к посту
    addLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers : {
                authorization : this._token,
                'Content-type' : 'application/json'
            }
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }

    // Отмена лайка к посту
    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers : {
                authorization : this._token
            }
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка соединения с сервером: ${res.status}`));
    }
}