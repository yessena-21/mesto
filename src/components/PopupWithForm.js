import Popup from '../components/Popup.js'
export default class PopupWithImage extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {

        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._form.querySelectorAll('.form__input');
        this._submitButton = this._form.querySelector('.form__save-button');
        this._saveText = this._submitButton.textContent;

    }

    _getInputValues() {

        this._formValues = {};
        this._inputList.forEach(inputElement => this._formValues[inputElement.name] = inputElement.value);

        return this._formValues;

    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else {

            this._submitButton.textContent = this._saveText;
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        });
    }
}