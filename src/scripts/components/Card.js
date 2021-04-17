export default class Card {
    constructor({name, link, owner, likes, _id}, currentUserId, cardSelector, handleClickCard, handleDeleteCard, handleAddLike, handleRemoveLike) {
        this._name = name;
        this._link = link;
        this._cardId = _id;
        this._selector = cardSelector;
        this.currentUserId = currentUserId;
        this.cardOwnerId = owner._id;
        this.likes = likes;
        this.likesCount = likes.length;

        this._handleClickCard = handleClickCard;
        this._handleDeleteCard = handleDeleteCard;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
    };

    // Метод получения разметки карточки поста
    _getTemplate() {
        this._cardTemplate = document
            .querySelector(this._selector).content
            .querySelector('.card').cloneNode(true);
        this._cardElement = this._cardTemplate.querySelector('.elements__item-image');
        this._buttonDelete = this._cardTemplate.querySelector('.elements__item-trash');
        this._buttonLike = this._cardTemplate.querySelector('.elements__item-like');

        return this._cardTemplate;
    }

    // Метод изменения состояния кнопки лайка
    _handleLikeButton() {
        this._buttonLike.classList.toggle('elements__item-like_active');
    };

    // Метод устанавливающий слушателей карточке
    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            if (this._checkForLike()) {
                this._handleRemoveLike(this);
                this._handleLikeButton();
            } else {
                this._handleAddLike(this);
                this._handleLikeButton();
            }
        });
        this._buttonDelete.addEventListener('click', () => this._handleDeleteCard(this));
        this._cardElement.addEventListener('click', () => this._handleClickCard(this._link, this._name));
    };

    // Метод создания карточки поста
    getCard() {
        this._cardItem = this._getTemplate();
        this._setEventListeners();
        this._cardElement.src = this._link;
        this._cardElement.alt = this._name;
        this._cardItem.querySelector('.elements__item-title').textContent = this._name;
        this._checkForLike() ? this._buttonLike.classList.add('elements__item-like_active') : this._buttonLike.classList.remove('elements__item-like_active');
        this._setLikes();
        this._delButtonVisibility();

        return this._cardItem;
    };

    // Метод отображения кнопки удаления карточки
    _delButtonVisibility() {
        if(this.cardOwnerId === this.currentUserId) {
            this._buttonDelete.classList.add('elements__item-trash_visible');
        }
    }

    // Метод установки кол-ва лайков в соотв. поле
    _setLikes() {
        this._cardTemplate.querySelector('.elements__like-count').textContent = this.likesCount;
    }

    // Метод удаления карточки поста
    handleDeleteCardElement() {
        this._cardItem.remove();
    };

    // Метод получения идентификатора карточки поста
    getCardId() {
        return this._cardId;
    }

    // Метод проверки карточки на наличие лайка от текущего пользователя
    _checkForLike() {
        return Boolean(this.likes.find((like) => like._id === this.currentUserId))
    }

    // Метод обновления лайков
    updateLikes(data) {
        this.likes = data;
        this.likesCount = data.length;
        this._setLikes();
        this._checkForLike();
    }
};