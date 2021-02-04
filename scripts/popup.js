let popupOpenBtn = document.querySelector('.profile__btn_edit');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let form = document.querySelector('.form_edit');
let nameField = form.elements.name;
let aboutField = form.elements.about;

let popupBlock = document.querySelector('.popup');

function getUserData () {
    let userName = document.querySelector('.profile__name').textContent;
    let userAbout = document.querySelector('.profile__about').textContent;

    let userData = {userName, userAbout};

    return userData;
}

function setUserData (name, about) {
    let nameField = document.querySelector('.profile__name');
    let aboutField = document.querySelector('.profile__about');

    nameField.textContent = name;
    aboutField.textContent = about;
}

function popupShow () {
    event.preventDefault();

    nameField.value = getUserData().userName;
    aboutField.value = getUserData().userAbout;

    popupBlock.classList.add('popup_opened');
}

function popupHide (blockName) {
    event.preventDefault();

    nameField.value = '';
    aboutField.value = '';

    popupBlock.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameValue = nameField.value;
    let aboutValue = aboutField.value;

    setUserData(nameValue, aboutValue);
    popupHide();
}

popupOpenBtn.addEventListener('click', popupShow);
popupCloseBtn.addEventListener('click', popupHide);

//form submit
form.addEventListener('submit', formSubmitHandler);