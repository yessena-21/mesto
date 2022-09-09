import Popup from '../components/Popup.js'
export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;
    }

    open(cardId) {
        this._cardId = cardId;
        super.open()
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._cardId);
        });
    }
}