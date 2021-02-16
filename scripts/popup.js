// Функция отображения попапа
const popupShow = (popupBlock) => {
    event.preventDefault();

    document.querySelector(`.${popupBlock}`).classList.add('popup_opened');
};

// Функция скрытия попапа
const popupHide = (block) => {
    event.preventDefault();
    block.closest('.popup').classList.remove('popup_opened');
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
}

//Фукнция изменения данных пользователя
const editProfile = () => {
    event.preventDefault();

    setUserInfo();
    popupHide(this);
}

//Функция создания карточек
function addCard () {
    event.preventDefault();

    const name = addCardForm.elements.title.value;
    const link = addCardForm.elements.source.value;
    initialCards.push({name, link});

    renderCard(initialCards[initialCards.length-1]);
    addCardForm.reset();
    popupHide(this);
}

editProfileBtn.addEventListener('click',() => {
    popupShow('popup_edit');
    getUserInfo();
});
addCardBtn.addEventListener('click', () => popupShow('popup_add'));

//Обработка закрытия попапов
popupCloseBtn.forEach(function (item) {
    item.addEventListener('click', () => popupHide(item));
});

//form submit
editForm.addEventListener('submit', editProfile);
addCardForm.addEventListener('submit',  addCard);