export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameUser = document.querySelector(nameSelector);
        this._aboutUser = document.querySelector(aboutSelector);
        this._userAvatar = document.querySelector(avatarSelector);
    }

    // Метод получения инофрмации о пользователе
    getUserInfo() {
        return {
            name: this._nameUser.textContent,
            about: this._aboutUser.textContent
        };
    }

    // Метод изменения инофрмации о пользователе
    setUserInfo({ name, about }) {
        this._nameUser.textContent = name;
        this._aboutUser.textContent = about;
    }

    // Метод изменения аватара пользователя
    setAvatar(link) {
        this._userAvatar.src = link;
    }
}