const popupCloseBtn = document.querySelectorAll('.popup__close-btn');
const addCardBtn = document.querySelector('.profile__btn_add');
const editProfileBtn = document.querySelector('.profile__btn_edit');

const editForm = document.querySelector('form[name="editForm"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameField = editForm.elements.name;
const aboutField = editForm.elements.about;

const addCardForm = document.querySelector('form[name="addCardForm"]');

//Функция отображения попапа
function popupShow (popupBlock) {
    event.preventDefault();

    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;

    document.querySelector(`.${popupBlock}`).classList.add('popup_opened');
}

//Функция скрывания попапа
function popupHide (block) {
    event.preventDefault();

    block.closest('.popup').classList.remove('popup_opened');
}

//Фукнция изменения данных пользователя
function editProfile () {
    event.preventDefault();

    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;

    popupHide(this);
}

//Функция создания карточек
function addCard () {
    event.preventDefault();

    let cardTitle = addCardForm.elements.title.value;
    let cardSrc = addCardForm.elements.source.value;

    if (cardTitle === '') {
        cardTitle = 'Название отсутствует';
    }

    createCard(cardTitle, cardSrc);

    addCardForm.elements.title.value = '';
    addCardForm.elements.source.value = '';

    popupHide(this);
}

editProfileBtn.addEventListener('click',() =>  popupShow('popup_edit'));
addCardBtn.addEventListener('click', () => popupShow('popup_add'));

//Обработка закрытия попапов
popupCloseBtn.forEach(function (item) {
    item.addEventListener('click', () => popupHide(item));
});

//form submit
editForm.addEventListener('submit', editProfile);
addCardForm.addEventListener('submit',  addCard);