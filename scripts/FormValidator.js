export default class FormValidator {
  constructor(validationParams, formElement) {
    this._formElement = validationParams.formSelector;
    this._inputElement = validationParams.inputSelector;
    this._buttonElement = validationParams.submitButtonSelector;
    this._inactiveButtonClass = validationParams.inactiveButtonClass;
    this._inputErrorClass = validationParams.inputErrorClass;
    this._errorClass = validationParams.errorClass;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputElement));

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

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  };

  _enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };


  _toggleButtonState = (buttonElement) => {

    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }

  };

  _setEventListeners = () => {
    const buttonElement = this._formElement.querySelector(this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

  };

}
