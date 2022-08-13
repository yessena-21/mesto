import Card from '../scripts/Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from '../scripts/cards.js';

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const formEditProfile = popupEditProfile.querySelector('.form');
const nameInput = document.querySelector('.form__input-name');
const jobInput = document.querySelector('.form__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupCloseButtonEdit = popupEditProfile.querySelector('.popup__exit-button');

const popupAddCard = document.querySelector('.popup_type_add-new-element');
const popupCloseButtonAdd = popupAddCard.querySelector('.popup__exit-button');
const buttonAddCard = document.querySelector('.profile__button-add');
const formAddCard = popupAddCard.querySelector('.form');
const titleInput = document.querySelector('.form__input-title');
const linkInput = document.querySelector('.form__input-link');

const cardsContainer = document.querySelector('.elements__photo-grid');
const popupImageView = document.querySelector('.popup_type_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupImageCloseButton = popupImageView.querySelector('.popup__exit-button');


const validationParams = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type-error',
  errorClass: 'form__input-error_active'
};

function openProfileEditPopup() {

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
  console.log(popupEditProfile);
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

function closeOnEscKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  };
};


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeOnEscKey);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeOnEscKey);
  
  const formElement = popup.querySelector('.form');
  const buttonElement = popup.querySelector('.form__save-button')
  const formValid = new FormValidator(validationParams, formElement);
  formValid.disableSubmitButton(buttonElement);  

};


function openImageFullPopup() {
  popupImage.src = this.src;
  popupImage.alt = this.alt;
  popupImageName.textContent = this.alt;
  openPopup(popupImageView);
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
popupImageCloseButton.addEventListener('click', closeImageFullPopup);

function handleSubmitFormCard(evt) {
  evt.preventDefault();
  addCard({
    name: titleInput.value,
    link: linkInput.value
  })
  closePopup(popupAddCard);
  
  
  formAddCard.reset();
  const buttonElement = popupAddCard.querySelector('.form__save-button')

  const formValid = new FormValidator(validationParams, formAddCard);
  formValid.disableSubmitButton(buttonElement);  
}

formAddCard.addEventListener('submit', handleSubmitFormCard);

function closeImageFullPopup() {
  closePopup(popupImageView);
}

popupImageCloseButton.addEventListener('click', closeImageFullPopup);

function addCard(cardData) {
  const newcard = new Card(cardData,'#elements-template', openImageFullPopup);
  const card = newcard.createCard();

  cardsContainer.prepend(card);
}

const renderInitialCard = () => {
  initialCards.forEach(addCard);
};
renderInitialCard();
// конец добавления 6-ти карт

const popupList = document.querySelectorAll('.popup');
const popupFormList = document.querySelectorAll('.form');

popupList.forEach((popup) => {
  popup.addEventListener('click', closeOnClick);

});

popupFormList.forEach((formElement) => {
  const formValid = new FormValidator(validationParams, formElement);
  formValid.enableValidation();

});