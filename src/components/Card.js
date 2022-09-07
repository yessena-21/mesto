
export default class Card {

  constructor(data, templateSelector, handleCardClick, { handleLikeClick, handleDeleteClick }, currentId) {

    this._data = data;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currentId = currentId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;


  }

  _getView() {
    if (this._ownerId === this._currentId) {
      this._card.querySelector('.elements__delete').classList.add('elements__delete_show');
    }
  }
  createCard = () => {

    this._card = this._template.cloneNode(true).querySelector('.elements__element');

    this._cardImage = this._card.querySelector('.elements__image');
    this._cardTitle = this._card.querySelector('.elements__title');
    this._buttonDelete = this._card.querySelector('.elements__delete');
    this._likeCounter = this._card.querySelector('.elements__like-counter');
    this._buttonLike = this._card.querySelector('.elements__like');
    this._cardImage.alt = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardTitle.textContent = this._data.name;
    this._likeCounter.textContent = this._data.likes.length;
    this._id = this._data._id;
    this._getView();
    this._setEventListeners();

    return this._card;

  }


  _setEventListeners() {

    this._cardImage.addEventListener('click', this._handleCardClick);
    this._buttonLike.addEventListener('click', this._handleLikeClick);
    this._buttonDelete.addEventListener('click', this._handleDeleteClick);
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(data) {
    console.log();
    this._isLiked = data.likes.filter((item) => { return item._id == this._currentId; }).length > 0; 
    this._card.querySelector('.elements__like-counter').textContent = data.likes.length;
  
    if (this._isLiked) {
      this._buttonLike.classList.add('element__like_active');
    } else {
      this._buttonLike.classList.remove('element__like_active');
    }
  }
  deleteCard = () => {

    this._card.remove();
    this._card = null;

  }

}