export class FormValidator {

    constructor (config, formElement) {
        this._formElement = formElement;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    };

    // Метод отображения ошибок валидации
    _showErrorMessage = () => {
        this._inputElement.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
        this._errorElement.textContent = this._inputElement.validationMessage;
    };

    // Метод скрытия ошибок валидации
    _hideErrorMessage = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = "";
    };

    // Метод проверки валидности полей
    _checkInputValidity = (inputElement) => {
        this._inputElement = inputElement;
        this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);

        if (!this._inputElement.validity.valid) {
            this._showErrorMessage();
        } else {
            this._hideErrorMessage(inputElement);
        }
    };

    // Метод проверки полей на наличие поля с ошибкой
    _hasInvalidInput = () => {
        return this._inputsList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // Метод меняющий состояние кнопки отправки формы
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    // Метод задающий слушателей полям
    _setEventListeners = () => {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState(this._inputsList, this._buttonElement);

        this._inputsList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputsList, this._buttonElement);
            })
        });
    };

    enableValidation = () => {
        this._setEventListeners()
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault()
            this._toggleButtonState(this._inputsList, this._buttonElement);
        })
    };
}