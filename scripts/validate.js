// Функция отображения ошибок валидации
const showErrorMessage = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// Функция скрытия ошибок валидации
const hideErrorMessage = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

// Функция проверки валидности полей
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showErrorMessage(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideErrorMessage(formElement, inputElement, inputErrorClass, errorClass);
    }
};

// Функция проверки полей на наличие поля с ошибкой
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Функция меняющая состояние кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

// Функция задающая слушателей полям
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputsList, buttonElement, inactiveButtonClass);

    inputsList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
        })
    });
};

// Функция запускающая валидацию форм
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formsList = Array.from(document.querySelectorAll(formSelector));

  formsList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

 enableValidation({
     formSelector: '.form',
     inputSelector: '.form__input',
     submitButtonSelector: '.form__submit',
     inactiveButtonClass: 'form__submit_disabled',
     inputErrorClass: 'form__input_invalid',
     errorClass: 'form__input-error_active'
});