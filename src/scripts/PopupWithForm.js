import Popup from '../scripts/Popup.js'
export default class PopupWithImage extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {

        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;

    }

    _getInputValues() {

        this._inputList = this._form.querySelectorAll('.form__input');
        this._formValues = {};
        this._inputList.forEach(inputElement => this._formValues[inputElement.name] = inputElement.value);
        return this._formValues;

    }

    close() {

        super.close();
    }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        });
    }
}