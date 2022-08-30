import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/Api.js';

import {
  popupEditProfileSelector,
  popupAddCardSelector,
  popupImageViewSelector,
  popupEditAvatarSelector,
  popupDeleteConfirmSelector,
  cardListSectionSelector,
  buttonAddCard,
  formEditProfile,
  formEditAvatar,
  buttonEditAvatar,
  buttonEditProfile,
  nameInput,
  descriptionInput,
  profileNameSelector,
  profileDescriptionSelector,
  formAddCard,
  validationParams,
  token,
  baseURL
} from '../utils/variables.js';


function createCard(card) {
  const newCard = new Card(
    card,
    '#elements-template',
    handleCardClick,
    handleDeleteClick);
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


//+++ класс  API
const api = new API(baseURL,token);
//--- класс API
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
// +++ попап изменения аватара
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (userData) => {
    popupEditAvatar.close();
  }

});

popupEditAvatar.setEventListeners();
// --- попап изменения аватара
// +++ попап подтвеждения удаления
const popupDeleteConfirm = new PopupWithConfirm({
  popupSelector: popupDeleteConfirmSelector
}
);
popupDeleteConfirm.setEventListeners();
// --- попап подтвеждения удаления

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

const formEditAvatarValidator = new FormValidator(validationParams, formEditAvatar);
formEditAvatarValidator.enableValidation();
// --- валидаторы

// +++ обработчик открытия картинки
function handleCardClick() {
  popupImageView.open(this.src, this.alt);
}
// --- обработчик открытия картинки

function handleDeleteClick() {
  popupDeleteConfirm.open();
}

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
// +++ listener кнопки редактирования аватара
// +++ listener кнопки редактирования аватара
buttonEditAvatar.addEventListener('click', () => {

  formEditAvatarValidator.disableSubmitButton();
  formEditAvatarValidator.resetValidation();

  popupEditAvatar.open();

});

api.getCardsArray()
  .then((res) => {
  cardList.renderItems(res);
});

// +++ listener кнопки  редактирования аватара
// +++ генерация начальных карточек
// Promise.all([api.getCardsArray(), api.getUserInfo()])
//     .then(([cards,userData]) => {
//       console.log(userData.about);  
//       user.setUserInfo(userData);
//         // avatarImg.style.backgroundImage = `url(${userData.avatar})`;
//         // currentUserId = userData._id;
      
//         cardList.renderItems(cards);
//     })
//     .catch((err) => {
//         console.log(`${err}`);
//     });
//cardList.renderItems(Api.getCardsArray());
// --- генерация начальных карточек

