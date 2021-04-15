import './index.css';
import * as Constants from '../scripts/utils/constants.js';
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

const api = new Api({
    baseUrl : 'https://mesto.nomoreparties.co/v1/cohort-22',
    token : '312a0732-cbcd-4979-9e85-1354911a9934'
});

// Отображение информации о пользователе
api.getUserInfo().then((data) => {
   Constants.profileName.textContent = data.name;
   Constants.profileAbout.textContent = data.about;
   Constants.profileAvatar.src = data.avatar;
});

api.getInitialCards().then((item) => {
    initialCardList.renderItem(item);
});

const initialCardList = new Section ({
        renderer: (item) => {
            initialCardList.appendItem(createCard(item));
        },
    },
    '.elements__list');

const userInfo = new UserInfo({
    nameSelector: Constants.profileSelectors.nameSelector,
    aboutSelector: Constants.profileSelectors.aboutSelector
});

const popupView = new PopupWithImage('.popup_view');

const popupEdit = new PopupWithForm(
    '.popup_edit',
    (formValues) => {
        api.editUserInfo({name: formValues.name, about: formValues.about})
            .then(data => userInfo.setUserInfo(data));
    }
);

const popupAdd = new PopupWithForm(
    '.popup_add',
    (item) => {
        api.addCard({name : item.name, link : item.link});
        initialCardList.prependItem(createCard(item));
    });

const editProfileValidation = new FormValidator(Constants.validationFields, Constants.editForm);
const addCardValidation = new FormValidator(Constants.validationFields, Constants.addCardForm);

function createCard(item) {
    const card = new Card (item , '.card-template', () => {
        popupView.open(item);
    }).getCard();
    return card;
};

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupView.setEventListeners();

Constants.editProfileBtn.addEventListener('click', () => {
    const dataUser = userInfo.getUserInfo();
    Constants.nameField.value = dataUser.name;
    Constants.aboutField.value = dataUser.about;
    popupEdit.open();
    editProfileValidation.clearErrors();
});

Constants.addCardBtn.addEventListener('click', () => {
    Constants.addCardForm.reset();
    addCardValidation.clearErrors();
    addCardValidation.clearFields();
    popupAdd.open();
});

editProfileValidation.enableValidation();
addCardValidation.enableValidation();