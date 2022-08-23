import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
  profileNameSelector,
  profileDescriptionSelector,
  formAddCard,
  validationParams
} from '../utils/variables.js';


function createCard(card) {
  const newCard = new Card(card, '#elements-template', handleCardClick);
  const cardElement = newCard.createCard();

  return (cardElement);

}

// +++ класс  section 
const cardList = new Section({
 // data: initialCards,
  renderer: (card) => {
    const cardElement = createCard(card);
    cardList.additem(cardElement);
  },
},
  cardListSectionSelector
);
//--- класс section

// +++ class user -  получение  и установка данных пользователя
const user = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector });
// ---class user -  получение  и установка данных пользователя

/// +++  попапы

// +++ попап редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (userData) => {
    user.setUserInfo(userData);
    popupEditProfile.close();
  }

});

popupEditProfile.setEventListeners();
// --- попап редактирования профиля


// +++  попап добавления карточки пользователя
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (card) => {
    const cardElement = createCard(card);
    cardList.additem(cardElement);
    popupAddCard.close();
  }
}
);
popupAddCard.setEventListeners();
// ---  попап добавления карточки пользователя

// +++  попап просмотр картинки
const popupImageView = new PopupWithImage(popupImageViewSelector);
popupImageView.setEventListeners();
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
cardList.renderItems(initialCards);
// --- генерация начальных карточек

// +++ listener кнопки  редактирования профиля 
buttonEditProfile.addEventListener('click', () => {

  formEditProfileValidator.disableSubmitButton();
  formEditProfileValidator.resetValidation();

  const userData = user.getUserInfo();
  nameInput.value = userData.username;
  descriptionInput.value = userData.description;
  popupEditProfile.open();

});
// --- listener кнопки  редактирования профиля 

// +++ listener кнопки  добавления карточек
buttonAddCard.addEventListener('click', () => {

  formAddCardValidator.disableSubmitButton();
  formAddCardValidator.resetValidation();

  popupAddCard.open();

});
// +++ listener кнопки  добавления карточек
