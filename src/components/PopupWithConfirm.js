import Popup from '../components/Popup.js'
export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleDeleteClick }) {

        super(popupSelector);
        this._handleFormSubmit = handleDeleteClick;
        this._form = this._popup.querySelector('.form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit()
        });
    }
}