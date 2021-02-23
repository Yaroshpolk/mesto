// Функция отображения попапа
const popupShow = (popupBlock) => {
    event.preventDefault();

    document.querySelector(`.${popupBlock}`).classList.add('popup_opened');
};

// Функция скрытия попапа
const popupHide = (block) => {
    event.preventDefault();
    const popupBlock = block.closest('.popup');

    popupBlock.classList.remove('popup_opened');
    popupBlock.querySelector('.form').reset();
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
function editProfile () {
    event.preventDefault();

    setUserInfo();
    popupHide(this);
}

//Функция создания карточек
function addCard () {
    event.preventDefault();

    renderCard({
        name: addCardForm.elements.title.value,
        link: addCardForm.elements.source.value
    });
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

//Обработка закрытия попапа при нажатии на escape
document.addEventListener('keydown', (evt) => {
   popupsList.forEach((popupElement) => {
       if (popupElement.classList.contains('popup_opened') && evt.key === "Escape") {
           popupHide(popupElement);
       }
   })
});

//Обработка закрытия попапа при клику на оверлей
popupsList.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
        popupHide(evt.currentTarget);
    })

    popupElement.querySelector('.popup__container').addEventListener('click', evt => {
        evt.stopPropagation();
    })
})

//form submit
editForm.addEventListener('submit', editProfile);
addCardForm.addEventListener('submit',  addCard);