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

const popupCloseBtn = document.querySelectorAll('.popup__close-btn');
const addCardBtn = document.querySelector('.profile__btn_add');
const editProfileBtn = document.querySelector('.profile__btn_edit');

const editForm = document.querySelector('form[name="editForm"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameField = editForm.elements.name;
const aboutField = editForm.elements.about;

const addCardForm = document.querySelector('form[name="addCardForm"]');