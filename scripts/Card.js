export class Card  {

    constructor (data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate () {
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

        return this._cardElement;
    }

    generateCard () {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.elements__item-image');

        this._element.querySelector('.elements__item-title').textContent = this._name;
        this._image.alt = this._name;
        this._image.src = this._link;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners () {
        this._element.querySelector('.elements__item-like').addEventListener('click', this._handleLikeIcon);

        this._element.querySelector('.elements__item-trash').addEventListener('click', this._handleDeleteCard);

        this._element.querySelector('.elements__item-image').addEventListener('click', this._handlePreviewPicture);
    }

    _handleDeleteCard = () => {
        this._element.remove();
    }

    _handleLikeIcon = () => {
        this._element.querySelector('.elements__item-like').classList.toggle('elements__item-like_active');
    }

    _handlePreviewPicture = () => {
        imgContainer.src = this._link;
        subImg.textContent = this._name;

        popupShow(document.querySelector('.popup_view'));
    }
}


