export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleClose = this._handleEscClose.bind(this);
        this._popupSubmitBtn = this._popupElement.querySelector('.form__submit');
    }

    // Метод закрытия попапа по нажатию на Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    // Метод закрытия попапа по нажатию на оверлей
    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup') ||
            evt.target.classList.contains('popup__close-btn')) {
            this.close();
        }
    }

    // Метод устанавливающий слушателей
    setEventListeners() {
        this._popupElement
            .querySelector('.popup__close-btn')
            .addEventListener('click', () => this.close());

        this._popupElement
            .addEventListener('click', (evt) => this._handleOverlayClose(evt));
    }

    // Метод открытия попапа
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleClose);
    }

    // Метод закрытия попапа
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleClose);
    }

    // Метод определяющий статус операции попапа
    inProcessMsg(inProcess) {
        inProcess ? this._popupSubmitBtn.textContent = 'Сохранение...' : this._popupSubmitBtn.textContent = 'Сохранить';
    }
}