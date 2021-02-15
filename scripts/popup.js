const popupCloseBtn = document.querySelectorAll('.popup__close-btn');
const addCardBtn = document.querySelector('.profile__btn_add');
const editProfileBtn = document.querySelector('.profile__btn_edit');
const clickableImg = document.querySelectorAll('.elements__item-image');
const imgContainer =  document.querySelector('.popup__img');
const subImg = document.querySelector('.popup__subimg');

const editForm = document.querySelector('form[name="editForm"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameField = editForm.elements.name;
const aboutField = editForm.elements.about;

const addCardForm = document.querySelector('form[name="addCardForm"]');

function popupShow (popupBlock) {
    event.preventDefault();

    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;

    document.querySelector(`.${popupBlock}`).classList.add('popup_opened');
}

function popupHide (block) {
    event.preventDefault();

    block.closest('.popup').classList.remove('popup_opened');
}

function editProfile () {
    event.preventDefault();

    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;

    popupHide(this);
}

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

popupCloseBtn.forEach(function (item) {
    item.addEventListener('click', () => popupHide(item));
});

clickableImg.forEach(function (item) {
    item.addEventListener('click', function () {
        imgContainer.src = item.src;
        subImg.textContent = item.alt;
    });
    item.addEventListener('click', () => popupShow('popup_view'));
});

//form submit
editForm.addEventListener('submit', editProfile);
addCardForm.addEventListener('submit',  addCard);