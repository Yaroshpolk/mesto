import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__img');
        this._popupAbout = this._popupElement.querySelector('.popup__subimg');
    }

    // Метод открытия попапа
    open(link, name) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupAbout.textContent = name;
        super.open();
    }
}