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

const addCardBtn = document.querySelector('.profile__btn_add');
const editProfileBtn = document.querySelector('.profile__btn_edit');
const popupsList = Array.from(document.querySelectorAll('.popup'));

const editForm = document.querySelector('form[name="editForm"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameField = editForm.elements.name;
const aboutField = editForm.elements.about;

const addCardForm = document.querySelector('form[name="addCardForm"]');
const cardContainer = document.querySelector('.elements__list');

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Функция отображения попапа
const popupShow = (block) => {
    block.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

// Функция скрытия попапа
const popupHide = () => {
    popupsList.find((item) => {
        if (item.classList.contains('popup_opened')) {
            item.classList.remove('popup_opened');
            document.removeEventListener('keydown', closeByEscape);
        }
    });
};

// Функция получения информации о пользователе
const getUserInfo = () => {
    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;
};

// Функция редактирования информации о пользователе
const setUserInfo = () => {
    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;
};

// Функция изменения данных пользователя
function editProfile (evt) {
    evt.preventDefault();

    setUserInfo();
    popupHide(evt.target);
}

// Функция создания карточек
function addCard (evt) {
    evt.preventDefault();
    const card = renderCard({
        link: addCardForm.elements.source.value,
        name: addCardForm.elements.title.value
    })

    cardContainer.prepend(card);
    addCardForm.reset();
    popupHide();
}

editProfileBtn.addEventListener('click',() => {
    popupShow(popupsList.find((item) => {
        if (item.classList.contains('popup_edit')) {
            return item
        }
    }));
    getUserInfo();
});
addCardBtn.addEventListener('click', () => popupShow(popupsList.find((item) => {
    if (item.classList.contains('popup_add')) {
        return item
    }
})));

//Обработка закрытия попапа при нажатии на escape
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        popupHide(openedPopup);
    }
};

//Обработка закрытия попапа при клике по оверлею или нажатию на крестик
popupsList.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            popupHide()
        }
        if (evt.target.classList.contains('popup__close-btn')) {
            popupHide()
        }
    })
});

//form submit
editForm.addEventListener('submit', editProfile);
addCardForm.addEventListener('submit',  addCard);

// Настроки для валидации формы
const validationFields = ({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_active'
});

const profileValidation = new FormValidator(validationFields, addCardForm);
const photoValidation = new FormValidator(validationFields, editForm);

// Активируем валидацию форм
profileValidation.enableValidation();
photoValidation.enableValidation();

// Функция рендеринга карточек
const renderCard = (data) => {
    const cardElement = new Card(data, '.card-template');

    return cardElement.generateCard();
};

// Отрисовка карточек из массива
initialCards.forEach((item) => {
    cardContainer.prepend(renderCard(item));
});