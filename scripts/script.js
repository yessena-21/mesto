const popup = document.querySelector('.popup');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_description');
const popupCloseButton = popup.querySelector('.popup__exit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');







function openPopup() {
popup.classList.add ('popup_opened');
}
function closePopup() {
popup.classList.remove('popup_opened');
}
profileButtonEdit.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
  }
  
  formElement.addEventListener('submit', formSubmitHandler);





