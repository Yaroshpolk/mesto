export default class Card {
    constructor(item, cardSelector, handleClickCard) {
        this._selector = cardSelector;
        this._link = item.source;
        this._name = item.title;
        this._handleClickCard = handleClickCard;
    };

    _getTemplate() {
        this._cardTemplate = document
            .querySelector(this._selector).content
            .querySelector('.card').cloneNode(true);
        this._cardElement = this._cardTemplate.querySelector('.elements__item-image');
        this._buttonLike = this._cardTemplate.querySelector('.elements__item-like');
        this._buttonDelete = this._cardTemplate.querySelector('.elements__item-trash');

        return this._cardTemplate;
    }

    _handleLikeButton() {
        this._buttonLike.classList.toggle('elements__item-like_active');
    };

    _handleDeleteCard() {
        this._cardItem.remove();
    };

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => this._handleLikeButton());
        this._buttonDelete.addEventListener('click', () => this._handleDeleteCard());
        this._cardElement.addEventListener('click', () => this._handleClickCard(this._link, this._name));
    };

    getCard() {
        this._cardItem = this._getTemplate();
        this._cardElement.src = this._link;
        this._cardElement.alt = this._name;
        this._cardItem.querySelector('.elements__item-title').textContent = this._name;
        this._setEventListeners();

        return this._cardItem;
    };
};


