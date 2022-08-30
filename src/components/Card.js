
export default class Card {

  constructor(data, templateSelector, handleCardClick, handleDeleteClick) {

    this._data = data;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    console.log(handleDeleteClick);

  }

  createCard = () => {

    this._card = this._template.cloneNode(true).querySelector('.elements__element');
    this._buttonLike = this._card.querySelector('.elements__like');
    this._cardImage = this._card.querySelector('.elements__image');
    this._cardTitle = this._card.querySelector('.elements__title');
    this._buttonDelete = this._card.querySelector('.elements__delete');

    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardTitle.textContent = this._data.name;

    this._setEventListeners();

    return this._card;

  }

  _setEventListeners() {

    this._cardImage.addEventListener('click', this._handleCardClick);
    this._buttonLike.addEventListener('click', this._handleLikeClick);
    // this._buttonDelete.addEventListener('click', this._handleDeleteClick);
    this._buttonDelete.addEventListener('click', this._handleDeleteClick);
  }

  _handleLikeClick = () => {

    this._buttonLike.classList.toggle('element__like_active');

  }

  _handleDeleteClick = () => {

    this._card.remove();
    this._card = null;
    
  }

}