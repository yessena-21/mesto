export default class Card {

  #template = document.querySelector('#elements-template').content;
  #data;
  #card;
  constructor(data,openImageFullPopup) {

    this._data = data;
    this._openImageFullPopup = openImageFullPopup;

  }

  _createCard = () => {

    this._card = this.#template.cloneNode(true).children[0];

    this._card.querySelector('.elements__image').alt = this._data.name;
    this._card.querySelector('.elements__image').src = this._data.link;
    this._card.querySelector('.elements__title').textContent = this._data.name;

    this._card.querySelector('.elements__image').addEventListener('click', this._openImageFullPopup);
    this._card.querySelector('.elements__like').addEventListener('click', this._handleLikeClick);
    this._card.querySelector('.elements__delete').addEventListener('click', this._handleDeleteClick);


  }

  _handleLikeClick = () => {
    const buttonLike = this._card.querySelector('.elements__like');
    buttonLike.classList.toggle('element__like_active');
  }

  _handleDeleteClick = () => {
    this._card.remove()
  }

  getCard = () => {
    this._createCard();

    return this._card;
  }

}