export const validationFields = ({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_active'
});

export const profileSelectors = {
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about'
}

export const initialCards = [
    {
        title: 'Архыз',
        source: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        source: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        source: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        source: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        source: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        source: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const addCardBtn = document.querySelector('.profile__btn_add');
export const editProfileBtn = document.querySelector('.profile__btn_edit');

export const editForm = document.querySelector('form[name="editForm"]');
export const addCardForm = document.querySelector('form[name="addCardForm"]');

export const nameField = editForm.elements.name;
export const aboutField = editForm.elements.about;