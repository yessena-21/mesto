const popupEditProfile = document.querySelector('.popup_edit-profile');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const formEditProfile = popupEditProfile.querySelector('.form');
const nameInput = document.querySelector('.form__input-name');
const jobInput = document.querySelector('.form__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupCloseButtonEdit = popupEditProfile.querySelector('.popup__exit-button');
const popupAddCard = document.querySelector('.popup_add_new-element');
const popupCloseButtonAdd = popupAddCard.querySelector('.popup__exit-button');
const buttonAddCard = document.querySelector('.profile__button-add');
const formAddCard = popupAddCard.querySelector('.form');
const titleInput = document.querySelector('.form__input-title');
const linkInput = document.querySelector('.form__input-link');

// const cardsTemplate = document.querySelector('#elements-template').content;
// const templateCard = cardsTemplate.querySelector('.elements__element');
// const cardsContainer = document.querySelector('.elements__photo-grid');


const popupImageView = document.querySelector('.popup_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupImageCloseButton = popupImageView.querySelector('.popup__exit-button');


// контейнер для карточек
class CardsContainer {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addCard(card) {
    this._container.prepend(card);
  }

}

// класс карточек
class Card {

  #template = document.querySelector('#elements-template').content;
  #data;
  #card;
  constructor(data) {

    this._data = data;

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

  _openImageFullPopup = () => {
    popupImage.src = this._data.link;
    popupImage.alt = this._data.name;
    popupImageName.textContent = this._data.name;

    openPopup(popupImageView);
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
    //cardsContainer.prepend(newCard);
  }

}

/// добавляем начальные карточки
const cardsContainer = new CardsContainer('.elements__photo-grid');

function addCard(cardData) {
  const newcard = new Card(cardData);
  const card = newcard.getCard();

  cardsContainer.addCard(card);
}

const renderInitialCard = () => {
  initialCards.forEach(addCard);
};
renderInitialCard();
// конец добавления 6-ти карточек


// class FormValidation {
//   constructor(formSelector,onAddCard) {
//     document.querySelector(formSelector).addEventListener('submit', this._submitHandler);
//     this._onAddCard = onAddCard;
//   }

//   _submitHandler = (evt) => {
//     evt.preventDefault();

//     const data = Object.fromEntries(new FormData(evt.target));
//     this._onAddCard(data)
//   }
// }




function openProfileEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

function closeProfileEditPopup() {
  closePopup(popupEditProfile);
}

function closeOnClick(evt) {
  const buttonClosePopup = evt.currentTarget.querySelector('.popup__exit-button');
  if (evt.target === evt.currentTarget || evt.target === buttonClosePopup) {
    closePopup(evt.currentTarget);
  };
}

const popupList = [popupAddCard, popupEditProfile, popupImageView];
popupList.forEach((popup) => {
  popup.addEventListener('click', closeOnClick);
});

function closeOnEscKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  };
};


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeOnEscKey);
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeOnEscKey);
}





buttonEditProfile.addEventListener('click', openProfileEditPopup);
popupCloseButtonEdit.addEventListener('click', closeProfileEditPopup);

function handleSubmitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleSubmitFormProfile);


function openPopupAddCard() {
  openPopup(popupAddCard);
}

function closePopupAddCard() {
  closePopup(popupAddCard);
}

buttonAddCard.addEventListener('click', openPopupAddCard);


function handleSubmitFormCard(evt) {
  evt.preventDefault();
  addCard({
    name: titleInput.value,
    link: linkInput.value
  })
  closePopup(popupAddCard);
  const buttonElement = popupAddCard.querySelector('.form__save-button')
  formAddCard.reset();
  buttonElement.setAttribute('disabled', true)
  buttonElement.classList.add('form__save-button_disabled');
}

formAddCard.addEventListener('submit', handleSubmitFormCard);

function closeImageFullPopup() {
  closePopup(popupImageView);
}

popupImageCloseButton.addEventListener('click', closeImageFullPopup);

