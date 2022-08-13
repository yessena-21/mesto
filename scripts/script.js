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
const titleInput = document.querySelector('.form__input-title');
const linkInput = document.querySelector('.form__input-link');

// const cardsTemplate = document.querySelector('#elements-template').content;
// const templateCard = cardsTemplate.querySelector('.elements__element');
// const cardsContainer = document.querySelector('.elements__photo-grid');


const popupImageView = document.querySelector('.popup_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupImageCloseButton = popupImageView.querySelector('.popup__exit-button');
console.log(profileName)
console.log(formAddCard)
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
console.log(popupEditProfile)
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

// class FormValidation {
//   constructor(validationParams,formElement) {
//     this._formElement = validationParams.formElement;
//     this._inputElement = validationParams.inputElement;
//     this._buttonElement = validationParams.buttonElement;
//     this._inactiveButtonClass = validationParams.inactiveButtonClass;
//     this._inputErrorClass = validationParams.inputErrorClass;
//     this._errorShowClass = validationParams.errorShowClass;
//     this._controlSelectorClass = validationParams.controlSelectorClass;
//     this._errorClass = validationParams.errorClass;

//     this._formElement = FormElement;
//   }

// //   _submitHandler = (evt) => {
// //     evt.preventDefault();

// //     const data = Object.fromEntries(new FormData(evt.target));
// //     this._onAddCard(data)
// //   }

//   _showInputError = (inputElement, errorMessage) => {
//    // this._formElement = document.querySelector(formSelector);

//     const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(this._inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(this._errorClass);
//   };
  
//   _hideInputError = (inputElement) => {
//     //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(this._inputErrorClass);
//     errorElement.classList.remove(this._errorClass);
//     errorElement.textContent = ' ';
//   };
  
//   _checkInputValidity(inputElement) {
//     if (!inputElement.validity.valid) {
//         this._showInputError(inputElement, inputElement.validationMessage);
//     } else {
//         this._hideInputError(formElement, inputElement); 
//     }
//   };

//   _hasInvalidInput(inputList) {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     });
//   }

//   _toggleButtonState(inputList, buttonElement) {

//     if (hasInvalidInput(inputList)) {
//         buttonElement.classList.add(this._inactiveButtonClass);
//         buttonElement.setAttribute('disabled', true)
//     } else {
//         buttonElement.classList.remove(this._inactiveButtonClass);
//         buttonElement.removeAttribute('disabled')
//     }
  
//   }

//   _setEventListeners(formElement) {
//     const inputList = Array.from(formElement.querySelectorAll(this._inputElement));
//     const buttonElement = formElement.querySelector(this._buttonElement);
//     this._toggleButtonState(inputList, buttonElement);
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', function () {
//             this._checkInputValidity(inputElement);
//         });
//     });
//   };

//   enableValidation() {
//     const formList = Array.from(this._formElement.querySelectorAll(this._inputElement));
//     formList.forEach((formElement) => {
//         formElement.addEventListener('submit', function (evt) {
//             evt.preventDefault();
//         });
//     this._setEventListeners(this._formElement);
//     });
   
//   };

// }

// const validationParams = {
// formElement: '.popup__form',
// inputElement: '.popup__input',
// buttonElement: '.popup__submit',
// inactiveButtonClass: 'popup__submit_type_disabled',
// inputErrorClass: 'popup__input_type_error',
// errorShowClass: 'popup__error_type_active',
// controlSelectorClass: '.popup__control',
// errorClass: '.popup__error'
// };

// const formList = Array.from(document.querySelectorAll('popup__form'));

// formList.forEach((formElement) => {

//   const formValid =  new FormValidation(validationParams,formElement);
//   formValid.enableValidation(formValid._formElement);
//   // formElement.addEventListener('submit', (evt) => {
//   //   // У каждой формы отменим стандартное поведение
//   //   evt.preventDefault();
//   // });

//   // // Для каждой формы вызовем функцию setEventListeners,
//   // // передав ей элемент формы
//   // setEventListeners(formElement);
// });
