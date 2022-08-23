export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__exit-button');
        this._handleEscClose = this._handleEscClose.bind(this)
        this._closeOnClick = this._closeOnClick.bind(this)
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    _closeOnClick(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit-button')) {
            this.close();
        };
    }
    setEventListeners() {
        this._popup.addEventListener('click', this._closeOnClick);
    }
}