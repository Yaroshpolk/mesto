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
};

export const addCardBtn = document.querySelector('.profile__btn_add');
export const editProfileBtn = document.querySelector('.profile__btn_edit');

export const editForm = document.querySelector('form[name="editForm"]');
export const addCardForm = document.querySelector('form[name="addCardForm"]');

export const nameField = editForm.elements.name;
export const aboutField = editForm.elements.about;

export const profileAvatar = document.querySelector('.profile__avatar');
export const profileName = document.querySelector(profileSelectors.nameSelector);
export const profileAbout = document.querySelector(profileSelectors.aboutSelector);

export const cardLikes = document.querySelector('.elements__like-count');

export let userId;