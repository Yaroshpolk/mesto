import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__img');
        this._popupAbout = this._popupElement.querySelector('.popup__subimg');
    }

    open(item) {
        this._popupImage.src = item.source;
        this._popupImage.alt = item.title;
        this._popupAbout.textContent = item.title;
        super.open();
    }
}