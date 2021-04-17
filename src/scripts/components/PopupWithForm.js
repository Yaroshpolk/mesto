import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = document.querySelector(popupSelector).querySelector('.form');
    }

    // Метод получения значений из полей
    _getInputValues() {
        this._formValues = {};
        this._inputList = this._formElement.querySelectorAll('.form__input');
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    // Метод установки слушателей
    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    // Метод закрытия попапа
    close() {
        this._formElement.reset();
        super.close();
    }
}