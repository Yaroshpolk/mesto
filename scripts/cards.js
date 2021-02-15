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

function createCard (text, src) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardContainer = document.querySelector('.elements__list');

    cardElement.querySelector('.elements__item-title').textContent = text;
    cardElement.querySelector('.elements__item-image').alt = text;
    cardElement.querySelector('.elements__item-image').src = src;

    cardElement.querySelector('.elements__item-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__item-like_active');
    });

    cardElement.querySelector('.elements__item-trash').addEventListener('click', function (evt) {
        const parent = evt.target.parentNode;
        parent.remove();
    });

    cardContainer.prepend(cardElement);
}

initialCards.forEach(function (item, index) {
    createCard(item.name, item.link);
});

