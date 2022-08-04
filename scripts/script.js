const popupEditProfile = document.querySelector('.popup_edit-profile');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupCloseButtonEdit = popupEditProfile.querySelector('.popup__exit-button');
const popupAddCard = document.querySelector('.popup_add_new-element');
const popupCloseButtonAdd = popupAddCard.querySelector('.popup__exit-button');
const buttonAddCard = document.querySelector('.profile__button-add');
const formAddCard = popupAddCard.querySelector('.popup__form');
const titleInput = document.querySelector('.popup__field_title');
const linkInput = document.querySelector('.popup__field_link');

const popupImageView = document.querySelector('.popup_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupCloseButtonImage = popupImageView.querySelector('.popup__exit-button');


// контейнер для карточек
class CardsContainer {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addCard(card) {
    this._container.prepend(card);
  }

}



class Card {

  #template = document.querySelector('#elements-template').content;
  #data;
  #card;
  constructor(data) {

    this._data = data;

  }

  _createCard = () => {

    this._card = this.#template.cloneNode(true).children[0];

    console.log(this.#card)
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

const cardsContainer = new CardsContainer('.elements__photo-grid');

function addCard(cardData) {
  console.log(cardData);
  const newcard = new Card(cardData);
  console.log(newcard);
  const card = newcard.getCard();
  console.log(card);
  cardsContainer.addCard(card);
}

const renderCards = () => {
  initialCards.forEach(addCard);
}; //добавление 6-ти карточек

renderCards();

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfileEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

function closeProfileEditPopup() {
  closePopup(popupEditProfile);
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
popupCloseButtonAdd.addEventListener('click', closePopupAddCard);

function handleSubmitFormCard(evt) {
  evt.preventDefault();
  addCard({
    name: titleInput.value,
    link: linkInput.value
  })
  closePopup(popupAddCard);
  titleInput.value = "";
  linkInput.value = "";
}

formAddCard.addEventListener('submit', handleSubmitFormCard);

function closeImageFullPopup() {
  closePopup(popupImageView);
}

popupCloseButtonImage.addEventListener('click', closeImageFullPopup);









