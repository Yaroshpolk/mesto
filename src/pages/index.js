import './index.css';
import * as Constants from '../scripts/utils/constants.js';
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

const api = new Api({
    baseUrl : 'https://mesto.nomoreparties.co/v1/cohort-22',
    token : '312a0732-cbcd-4979-9e85-1354911a9934'
});

let userId;

// Получение информации о пользователе
api.getUserInfo()
    .then((data) => {
   Constants.profileName.textContent = data.name;
   Constants.profileAbout.textContent = data.about;
   Constants.profileAvatar.src = data.avatar;
   userId = data._id;
    })
    .catch((err) => {
        console.log(`Ошибка соединения с сервером: ${err.status}`)
    });

// Получение постов с сервера
api.getInitialCards()
    .then((item) => {
    initialCardList.renderItem(item);
    })
    .catch((err) => {
        console.log(`Ошибка соединения с сервером: ${err.status}`)
    });

// Отображение постов с сервера
const initialCardList = new Section ({
        renderer: (item) => {
            initialCardList.appendItem(createCard({
                name : item.name,
                link : item.link,
                likes : item.likes,
                owner : item.owner,
                _id : item._id
            }, userId));
        }
    },
    '.elements__list');

const userInfo = new UserInfo({
    nameSelector: Constants.profileSelectors.nameSelector,
    aboutSelector: Constants.profileSelectors.aboutSelector,
    avatarSelector : Constants.profileSelectors.avatarSelector
});

// Создание карточки поста
const createCard = ({name, link, likes, owner, _id} , selector,
                    handleCardClick = (name, link) => {
                        popupView.open(name, link);
                        popupView.setEventListeners();
                    },
                    handleDeleteCard = (card) => {
                        popupDeleteCard.open();
                        popupDeleteCard.setEventListeners();
                        popupDeleteCard.setSubmit(() => {
                            api.deleteCard(card.getCardId())
                                .then(() => card.handleDeleteCardElement())
                                .catch((err) => {
                                    console.log(`Ошибка удаления поста: ${err.status}`)
                                });
                        });
                    },
                    handleAddLike = (card) => {
                        api.addLike(card.getCardId())
                            .then((data) => card.updateLikes(data.likes))
                            .catch((err) => {
                                console.log(`Ошибка соединения с сервером: ${err.status}`)
                            });
                    },
                    handleRemoveLike = (card) => {
                        api.removeLike(card.getCardId())
                            .then((data) => card.updateLikes(data.likes))
                            .catch((err) => {
                                console.log(`Ошибка соединения с сервером: ${err.status}`)
                            });
                    }) => {
    const card = new Card({ name, link, likes, owner, _id },
        userId,
        '.card-template',
        handleCardClick,
        handleDeleteCard,
        handleAddLike,
        handleRemoveLike);

    return card.getCard();
};

// Попап с изображением
const popupView = new PopupWithImage('.popup_view');

// Попап с подтверждением удаления карточки
const popupDeleteCard = new PopupWithConfirm('.popup_delete');

// Попап с редактором аватара пользователя
const popupEditAvatar = new PopupWithForm(
    '.popup_avatar',
    (data) => {
        popupEditAvatar.inProcessMsg(true);
        api.changeAvatar(data.src)
            .then((link) => userInfo.setAvatar(link.avatar))

            .catch((err) => {
                console.log(`Ошибка редактирования автара: ${err.message}`)
            })
            .finally(() => {
                popupEditAvatar.inProcessMsg(false);
            });
    }
    );

// Попап с редактором данных о пользователе
const popupEdit = new PopupWithForm(
    '.popup_edit',
    (data) => {
        popupEdit.inProcessMsg(true);
        api.editUserInfo({name: data.name, about: data.about})
            .then((data) => userInfo.setUserInfo(data))
            .catch((err) => {
                console.log(`Ошибка редактирования данных пользователя: ${err.message}`)
            })
            .finally(() => {
                popupEdit.inProcessMsg(false);
            });
    }
);

// Попап с формой создания поста
const popupAdd = new PopupWithForm(
    '.popup_add',
    (data) => {
        popupAdd.inProcessMsg(true);
        api.addCard(data)
            .then((data) => {
                initialCardList.prependItem(createCard(data, '.card-template'));
            })
            .catch((err) => {
                console.log(`Ошибка создания поста: ${err.status}`)
            })
            .finally(() => {
                popupAdd.inProcessMsg(false);
            });
    });

// Инициализация валидируемых форм
const editProfileValidation = new FormValidator(Constants.validationFields, Constants.editForm);
const addCardValidation = new FormValidator(Constants.validationFields, Constants.addCardForm);
const changeAvatarValidation = new FormValidator(Constants.validationFields, Constants.editAvatarForm);

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupView.setEventListeners();
popupEditAvatar.setEventListeners();

// Обработчик нажатия на кнопку редактирования профиля
Constants.editProfileBtn.addEventListener('click', () => {
    const dataUser = userInfo.getUserInfo();
    Constants.nameField.value = dataUser.name;
    Constants.aboutField.value = dataUser.about;
    popupEdit.open();
    editProfileValidation.clearErrors();
});

// Обработчик нажатия на кнопку добавления поста
Constants.addCardBtn.addEventListener('click', () => {
    Constants.addCardForm.reset();
    addCardValidation.clearErrors();
    addCardValidation.clearFields();
    popupAdd.open();
});

// Обработчик нажатия на кнопку редактирования аватара пользователя
Constants.editAvatarBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    changeAvatarValidation.clearErrors();
    changeAvatarValidation.clearFields();
    popupEditAvatar.open();
});

// Запуск валидации форм
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
changeAvatarValidation.enableValidation();