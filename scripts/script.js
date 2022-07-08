const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add_new-element')
const profileButtonEdit = document.querySelector('.profile__button-edit');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_description');
const popupCloseButtonEdit = popupEditProfile.querySelector('.popup__exit-button');
const popupCloseButtonAdd = popupAddElement.querySelector('.popup__exit-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const addElementButton = document.querySelector('.profile__button-add');
const formAddElement = popupAddElement.querySelector('.popup__form');
const titleInput = document.querySelector('.popup__field_title');
const linkInput = document.querySelector('.popup__field_link');
const elementTemplate = document.querySelector('#elements-template').content;
const list = document.querySelector(".elements__photo-grid");






function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


profileButtonEdit.addEventListener('click', function() {
openPopup(popupEditProfile);
})
popupCloseButtonEdit.addEventListener('click', function() {
closePopup(popupEditProfile);
})

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}


addElementButton.addEventListener('click', function() {
  openPopup(popupAddElement);
  })
  popupCloseButtonAdd.addEventListener('click', function() {
  closePopup(popupAddElement);
  })
  

formEditProfile.addEventListener('submit', formSubmitHandler);





const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const renderElements = () => {
  initialCards.forEach(addElement);
}; //добавление 6-ти карточек

renderElements()

function addElement(element) {

  
  const newElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  newElement.querySelector('.elements__title').textContent = element.name;
  newElement.querySelector('.elements__image').setAttribute('src', element.link);
  newElement.querySelector('.elements__image').setAttribute('alt', element.name);

  setEventListeners(newElement);
  list.prepend(newElement);
}

const handleSubmit = (evt) => {
  evt.preventDefault();
  addElement({ name: titleInput.value,
             link: linkInput.value });
   closePopup(popupCloseButtonAdd);

}

formAddElement.addEventListener('submit', handleSubmit);



function setEventListeners(newElement) {
  
const buttonLikeElement = newElement.querySelector('.elements__like');
const buttonDeleteElement = newElement.querySelector('.elements__delete');

buttonLikeElement.addEventListener('click', function() {

  buttonLikeElement.classList.toggle('element__like_active');
})

buttonDeleteElement.addEventListener('click', function(evt) {
evt.target.closest('.elements__element').remove();

})
}





/*  const likeButtons = document.querySelectorAll('.elements__like');
  likeButtons.addEventListener('click', function(evt) {
    evt.target.closest('.elements__like').classList.add('cards__like_active');
  }); */




