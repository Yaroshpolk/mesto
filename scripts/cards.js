//Конструктор карточки
const getCardElement = (data) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__item-image');

    cardElement.querySelector('.elements__item-title').textContent = data.name;
    cardImage.alt = data.name;
    cardImage.src = data.link;

    cardElement.querySelector('.elements__item-like').addEventListener('click', handleLikeIcon);
    cardElement.querySelector('.elements__item-trash').addEventListener('click', handleDeleteCard);
    cardElement.querySelector('.elements__item-image').addEventListener('click', () => handlePreviewPicture(data));

    return cardElement;
}

// Обработчик удаления карточки
const handleDeleteCard = (evt) => {
    const parent = evt.target.parentNode;
    parent.remove();
};

// Обработчик кнопки лайка
const handleLikeIcon = (evt) => {
    evt.target.classList.toggle('elements__item-like_active');
};

// Обработчик увеличения картинки
const handlePreviewPicture = (data) => {
    imgContainer.src = data.link;
    subImg.textContent = data.name;

    popupShow('popup_view');
};

// Функция рендеринга карточек
const renderCard = (data) => {
    const cardContainer = document.querySelector('.elements__list');

    cardContainer.prepend(getCardElement(data));
};

// Отрисовка карточек из массива
initialCards.forEach((item, index) => renderCard(initialCards[index]));


