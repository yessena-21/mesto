export default class FormValidator {
  constructor(validationParams, formElement) {
    this._formElement = validationParams.formSelector;
    this._inputElement = validationParams.inputSelector;
    this._buttonElement = validationParams.submitButtonSelector;
    this._inactiveButtonClass = validationParams.inactiveButtonClass;
    this._inputErrorClass = validationParams.inputErrorClass;
    this._errorClass = validationParams.errorClass;

    this._formElement = formElement;
  }
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ' ';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = (inputList, buttonElement) => {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled')
    }

  }

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputElement));
    const buttonElement = formElement.querySelector(this._buttonElement);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
      this._setEventListeners(this._formElement);
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

  };

}
