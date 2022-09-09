import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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
  profileAvatarSelector,
  formAddCard,
  validationParams,
  headers,
  baseURL,
  avatarImage
} from '../utils/variables.js';

let currentUserId = null;


function handleLikeClick(card, data) {
  const promise = card.isLiked() ? api.dislikeCard(data._id) : api.likeCard(data._id);
  promise
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}
// +++ попап подтвеждения удаления
const popupDeleteConfirm = new PopupWithConfirm({
  popupSelector: popupDeleteConfirmSelector,
  handleFormSubmit: (card) => {
    api.deleteCard(card._id)
      .then(() => {
        card.deleteCard();

        popupDeleteConfirm.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    }
});
popupDeleteConfirm.setEventListeners();

// --- попап подтвеждения удаления


function createCard(card) {
  const newCard = new Card(
    card,
    '#elements-template',
    handleCardClick, {
    handleLikeClick: () => handleLikeClick(newCard, card),
    handleDeleteClick: () => handleDeleteClick(newCard)
  },
    currentUserId);
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
const api = new Api({
  baseUrl: baseURL,
  headers: headers
});
//--- класс API
// +++ class user -  получение  и установка данных пользователя
const user = new UserInfo({
  nameSelector: profileNameSelector,
  descriptionSelector: profileDescriptionSelector,
  avatarSelector: profileAvatarSelector
});
// ---class user -  получение  и установка данных пользователя

/// +++  попапы

// +++ попап редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (userData) => {
    popupEditProfile.renderLoading(true);
    api.setUserInfo(userData)

      .then((data) => {

        user.setUserInfo(data)
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      })

  }
})

popupEditProfile.setEventListeners();
// --- попап редактирования профиля
// +++ попап изменения аватара
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (ava) => {
    popupEditAvatar.renderLoading(true);
    api.editAvatar(ava)
      .then((data) => {
        avatarImage.src = data.avatar;
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`${err}`)
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false)
      })

  }

});

popupEditAvatar.setEventListeners();
// --- попап изменения аватара

// +++  попап добавления карточки пользователя
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (card) => {
    popupAddCard.renderLoading(true);
    api.createCard(card)
      .then((cardElement) => {
        const newCard = createCard(cardElement);
        cardList.additem(newCard);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`${err}`)
      })
      .finally(() => {
        popupAddCard.renderLoading(false)
      })
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

function handleDeleteClick(card) {
  //
  popupDeleteConfirm.open(card);
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

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {

    user.setUserInfo(userData);
    currentUserId = userData._id;

    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`${err}`);
  });

// --- генерация начальных карточек

