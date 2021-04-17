import './index.css';
import * as constants from '../scripts/utils/constants.js';
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import inProcessMsg from "../scripts/utils/utils.js";

const api = new Api({
    baseUrl : 'https://mesto.nomoreparties.co/v1/cohort-22',
    token : '312a0732-cbcd-4979-9e85-1354911a9934'
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        constants.profileName.textContent = userData.name;
        constants.profileAbout.textContent = userData.about;
        constants.profileAvatar.src = userData.avatar;
        initialCardList.renderItem(cards);
    })
    .catch((err) => {
        console.log(`Ошибка соединения с сервером: ${err.status}`);
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
    constants.cardsContainerSelector);

const userInfo = new UserInfo({
    nameSelector: constants.profileSelectors.nameSelector,
    aboutSelector: constants.profileSelectors.aboutSelector,
    avatarSelector : constants.profileSelectors.avatarSelector
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
                                })
                                .finally(() => {
                                    popupDeleteCard.close();
                                })
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
        constants.cardTemplateSelector,
        handleCardClick,
        handleDeleteCard,
        handleAddLike,
        handleRemoveLike);

    return card.getCard();
};

// Попап с изображением
const popupView = new PopupWithImage(constants.popupViewSelector);

// Попап с подтверждением удаления карточки
const popupDeleteCard = new PopupWithConfirm(constants.popupDeleteCardSelector);

// Попап с редактором аватара пользователя
const popupEditAvatar = new PopupWithForm(
    constants.popupAvatarSelector,
    (data) => {
        inProcessMsg(popupEditAvatar, true);
        api.changeAvatar(data.src)
            .then((link) => userInfo.setAvatar(link.avatar))

            .catch((err) => {
                console.log(`Ошибка редактирования автара: ${err.message}`)
            })
            .finally(() => {
                inProcessMsg(popupEditAvatar, false);
                popupEditAvatar.close();
            });
    }
    );

// Попап с редактором данных о пользователе
const popupEdit = new PopupWithForm(
    constants.popupEditSelector,
    (data) => {
        inProcessMsg(popupEdit, true);
        api.editUserInfo({name: data.name, about: data.about})
            .then((data) => userInfo.setUserInfo(data))
            .catch((err) => {
                console.log(`Ошибка редактирования данных пользователя: ${err.message}`)
            })
            .finally(() => {
                inProcessMsg(popupEdit, false);
                popupEdit.close();
            });
    }
);

// Попап с формой создания поста
const popupAdd = new PopupWithForm(
    constants.popupAddSelector,
    (data) => {
        inProcessMsg(popupAdd, true);
        api.addCard(data)
            .then((data) => {
                initialCardList.prependItem(createCard(data, constants.cardTemplateSelector));
            })
            .catch((err) => {
                console.log(`Ошибка создания поста: ${err.status}`)
            })
            .finally(() => {
                inProcessMsg(popupAdd, false);
                popupAdd.close();
            });
    });

// Инициализация валидируемых форм
const editProfileValidation = new FormValidator(constants.validationFields, constants.editForm);
const addCardValidation = new FormValidator(constants.validationFields, constants.addCardForm);
const changeAvatarValidation = new FormValidator(constants.validationFields, constants.editAvatarForm);

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupView.setEventListeners();
popupEditAvatar.setEventListeners();

// Обработчик нажатия на кнопку редактирования профиля
constants.editProfileBtn.addEventListener('click', () => {
    const dataUser = userInfo.getUserInfo();
    constants.nameField.value = dataUser.name;
    constants.aboutField.value = dataUser.about;
    popupEdit.open();
    editProfileValidation.clearErrors();
});

// Обработчик нажатия на кнопку добавления поста
constants.addCardBtn.addEventListener('click', () => {
    constants.addCardForm.reset();
    addCardValidation.clearErrors();
    addCardValidation.clearFields();
    popupAdd.open();
});

// Обработчик нажатия на кнопку редактирования аватара пользователя
constants.editAvatarBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    changeAvatarValidation.clearErrors();
    changeAvatarValidation.clearFields();
    popupEditAvatar.open();
});

// Запуск валидации форм
editProfileValidation.enableValidation();
addCardValidation.enableValidation();
changeAvatarValidation.enableValidation();