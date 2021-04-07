export default class FormValidator {

    constructor (config, formElement) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    };

    // Метод отображения ошибок валидации
    _showErrorMessage() {
        this._inputElement.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
        this._errorElement.textContent = this._inputElement.validationMessage;
    };

    // Метод скрытия ошибок валидации
    _hideErrorMessage(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = "";
    };

    // Метод проверки валидности полей
    _checkInputValidity(inputElement) {
        this._inputElement = inputElement;
        this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);

        if (!this._inputElement.validity.valid) {
            this._showErrorMessage();
        } else {
            this._hideErrorMessage(inputElement);
        }
    };

    // Метод проверки полей на наличие поля с ошибкой
    _hasInvalidInput() {
        return this._inputsList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // Метод меняющий состояние кнопки отправки формы
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    // Метод задающий слушателей полям
    _setEventListeners() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState(this._inputsList, this._buttonElement);

        this._inputsList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        });
    };

    clearErrors() {
        this._inputsList.forEach((inputElement) => {
            this._hideErrorMessage(inputElement);
        });
        this._toggleButtonState();
    }

    clearFields() {
        this._inputsList.forEach((inputElement) => {
           inputElement.value = "";
        });
    }

    enableValidation() {
        this._setEventListeners()
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault()
            this._toggleButtonState();
        })
    };
}