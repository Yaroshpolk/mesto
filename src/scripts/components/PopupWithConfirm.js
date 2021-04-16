import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = document.querySelector(popupSelector).querySelector('.form');
    }

    // Метод установки слушателей попапа
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
            super.close();

        });
    }

    // Метод установки функции сабмита
    setSubmit(action) {
        this._handleSubmitCallback = action;
    }
}