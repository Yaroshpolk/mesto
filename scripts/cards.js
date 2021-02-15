const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const imgContainer =  document.querySelector('.popup__img');
const subImg = document.querySelector('.popup__subimg');

//Функция создания карточек
function createCard (text, src) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardContainer = document.querySelector('.elements__list');

    cardElement.querySelector('.elements__item-title').textContent = text;
    cardElement.querySelector('.elements__item-image').alt = text;
    cardElement.querySelector('.elements__item-image').src = src;

    //Кнопка лайка
    cardElement.querySelector('.elements__item-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__item-like_active');
    });

    //Удаления карточки
    cardElement.querySelector('.elements__item-trash').addEventListener('click', function (evt) {
        const parent = evt.target.parentNode;
        parent.remove();
    });

    //Увеличение картинки
    cardElement.querySelector('.elements__item-image').addEventListener('click', function (evt) {
        imgContainer.src = evt.target.src;
        subImg.textContent = evt.target.alt;

        popupShow('popup_view');
    });

    cardContainer.prepend(cardElement);
}

//Создание карточек "из коробки"
initialCards.forEach(function (item, index) {
    createCard(item.name, item.link);
});

