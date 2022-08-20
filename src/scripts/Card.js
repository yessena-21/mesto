
export default class Card {

  constructor(data, templateSelector, handleCardClick) {

    this._data = data;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;

  }

  createCard = () => {

    this._card = this._template.cloneNode(true).querySelector('.elements__element');
    this._buttonLike = this._card.querySelector('.elements__like');

    this._card.querySelector('.elements__image').alt = this._data.name;
    this._card.querySelector('.elements__image').src = this._data.link;
    this._card.querySelector('.elements__title').textContent = this._data.name;

    this._setEventListeners();

    return this._card;

  }

  _setEventListeners() {

    this._card.querySelector('.elements__image').addEventListener('click', this._handleCardClick);
    this._card.querySelector('.elements__like').addEventListener('click', this._handleLikeClick);
    this._card.querySelector('.elements__delete').addEventListener('click', this._handleDeleteClick);

  }

  _handleLikeClick = () => {

    this._buttonLike.classList.toggle('element__like_active');

  }

  _handleDeleteClick = () => {

    this._card.remove()

  }

}