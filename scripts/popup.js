let popupOpenBtn = document.querySelector('.profile__btn_edit');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let form = document.querySelector('.form');
let nameField = form.elements.name;
let aboutField = form.elements.about;

let popupBlock = document.querySelector('.popup');

function popupShow () {
    event.preventDefault();

    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;

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

    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;

    popupHide();
}

popupOpenBtn.addEventListener('click', popupShow);
popupCloseBtn.addEventListener('click', popupHide);

//form submit
form.addEventListener('submit', formSubmitHandler);