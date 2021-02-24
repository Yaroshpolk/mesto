// Функция отображения попапа
const popupShow = (block) => {
    block.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

// Функция скрытия попапа
const popupHide = (block) => {
    block.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
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

//Фукнция изменения данных пользователя
function editProfile (evt) {
    evt.preventDefault();

    setUserInfo();
    popupHide(evt.target);
}

//Функция создания карточек
function addCard (evt) {
    evt.preventDefault();

    renderCard({
        name: addCardForm.elements.title.value,
        link: addCardForm.elements.source.value
    });
    addCardForm.reset();
    popupHide(evt.target);
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
                popupHide(popupElement)
            }
            if (evt.target.classList.contains('popup__close-btn')) {
                popupHide(popupElement)
            }
        })
});

//form submit
editForm.addEventListener('submit', editProfile);
addCardForm.addEventListener('submit',  addCard);