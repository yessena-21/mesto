class FormValidation {
      constructor(validationParams,formElement) {
        this._formElement = validationParams.formElement;
        this._inputElement = validationParams.inputElement;
        this._buttonElement = validationParams.buttonElement;
        this._inactiveButtonClass = validationParams.inactiveButtonClass;
        this._inputErrorClass = validationParams.inputErrorClass;
        this._errorShowClass = validationParams.errorShowClass;
        this._controlSelectorClass = validationParams.controlSelectorClass;
        this._errorClass = validationParams.errorClass;

        this._formElement = FormElement;
      }
    
    //   _submitHandler = (evt) => {
    //     evt.preventDefault();
    
    //     const data = Object.fromEntries(new FormData(evt.target));
    //     this._onAddCard(data)
    //   }

      _showInputError = (inputElement, errorMessage) => {
       // this._formElement = document.querySelector(formSelector);

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
      
      _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement); 
        }
      };

      _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
      }

      _toggleButtonState(inputList, buttonElement) {

        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true)
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled')
        }
      
      }

      _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputElement));
        const buttonElement = formElement.querySelector(this._buttonElement);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                this._checkInputValidity(inputElement);
            });
        });
      };

      enableValidation() {
        const formList = Array.from(this._formElement.querySelectorAll(this._inputElement));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
        this._setEventListeners(this._formElement);
        });
       
      };

   }

  const validationParams = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    buttonElement: '.popup__submit',
    inactiveButtonClass: 'popup__submit_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorShowClass: 'popup__error_type_active',
    controlSelectorClass: '.popup__control',
    errorClass: '.popup__error'
};