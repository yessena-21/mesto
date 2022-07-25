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

const cardsTemplate = document.querySelector('#elements-template').content;
const templateCard = cardsTemplate.querySelector('.elements__element');
const cardsContainer = document.querySelector('.elements__photo-grid');


const popupImageView = document.querySelector('.popup_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const popupImageCloseButton = popupImageView.querySelector('.popup__exit-button');





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

function closeOnEscKey(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  };
};

function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  closeOnEscKey(evt, popupOpened)
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', keyHandler);
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', keyHandler)
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



function createCard(card) {
  const newCard = templateCard.cloneNode(true);
  const buttonLikeCard = newCard.querySelector('.elements__like');
  const buttonDeleteCard = newCard.querySelector('.elements__delete');
  const titleCard = newCard.querySelector('.elements__title');
  const imageCard = newCard.querySelector('.elements__image');

  titleCard.textContent = card.name;
  imageCard.src = card.link;
  imageCard.alt = card.name;


  function openImageFullPopup() {
    popupImage.src = imageCard.src;
    popupImage.alt = imageCard.alt;
    popupImageName.textContent = imageCard.alt;

    openPopup(popupImageView);
  }

  function handleLikeClick() {
    buttonLikeCard.classList.toggle('element__like_active');
  }

  function handleDeleteClick(evt) {
    newCard.remove()
  }

  imageCard.addEventListener('click', openImageFullPopup);
  buttonLikeCard.addEventListener('click', handleLikeClick);
  buttonDeleteCard.addEventListener('click', handleDeleteClick);

  return newCard;

}




function addCard(cardData) {
  const newCard = createCard(cardData);
  cardsContainer.prepend(newCard);
}


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


const renderInitialCard = () => {
  initialCards.forEach(addCard);
}; //добавление 6-ти карточек

renderInitialCard();






