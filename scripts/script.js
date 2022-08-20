import Card from '../scripts/Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from '../scripts/cards.js';
import Section from '../scripts/Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

import {
  popupEditProfileSelector,
  popupAddCardSelector,
  popupImageViewSelector,
  cardListSectionSelector,
  buttonAddCard,
  formEditProfile,
  buttonEditProfile,
  nameInput,
  descriptionInput,
  profileName,
  profileDescription,
  formAddCard,
  validationParams
} from '../scripts/variables.js';

// +++ класс  section 
const cardList = new Section({
  data: initialCards,
  renderer: (card) => {
    const newCard = new Card(card, '#elements-template', handleCardClick);
    const cardElement = newCard.createCard();
    cardList.additem(cardElement);
  },
},
  cardListSectionSelector
);
//--- класс section

// +++ class user -  получение  и установка данных пользователя
const user = new UserInfo({ nameElement: profileName, descriptionElement: profileDescription });
// ---class user -  получение  и установка данных пользователя

/// +++  попапы

// +++ попап редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (userData) => {
    profileName.textContent = userData.username;
    profileDescription.textContent = userData.description;
    popupEditProfile.close();
  }

});

popupEditProfile.setEventListeners();
// --- попап редактирования профиля

// +++  попап добавления карточки пользователя
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (card) => {
    const newCard = new Card(card, '#elements-template', handleCardClick);
    const cardElement = newCard.createCard();
    cardList.additem(cardElement);
    popupAddCard.close();
  }
}
);
popupAddCard.setEventListeners();
// ---  попап добавления карточки пользователя

// +++  попап просмотр картинки
const popupImageView = new PopupWithImage(popupImageViewSelector);
popupEditProfile.setEventListeners();
// ---  попап просмотр картинки

// --- попапы

// +++ валидаторы 
const formAddCardValidator = new FormValidator(validationParams, formAddCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(validationParams, formEditProfile);
formEditProfileValidator.enableValidation();
// --- валидаторы

// +++ обработчик открытия картинки
function handleCardClick() {
  popupImageView.open(this.src, this.alt);
}
// --- обработчик открытия картинки

// +++ генерация начальных карточек
cardList.renderItems();
// --- генерация начальных карточек

// +++ listener кнопки  редактирования профиля 
buttonEditProfile.addEventListener('click', () => {
  formEditProfileValidator.disableSubmitButton();
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;
  popupEditProfile.open();
});
// --- listener кнопки  редактирования профиля 

// +++ listener кнопки  добавления карточек
buttonAddCard.addEventListener('click', () => {
  formAddCardValidator.disableSubmitButton();
  popupAddCard.open();
});
// +++ listener кнопки  добавления карточек
