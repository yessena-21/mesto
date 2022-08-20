export const cardListSectionSelector = '.elements__photo-grid';
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const popupAddCardSelector = '.popup_type_add-new-element';
export const popupImageViewSelector = '.popup_type_view-image';
export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';


export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const buttonEditProfile = document.querySelector('.profile__button-edit');
export const formEditProfile = popupEditProfile.querySelector('.form');
export const nameInput = popupEditProfile.querySelector('.form__input-name');
export const descriptionInput = popupEditProfile.querySelector('.form__input-description');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const popupCloseButtonEdit = popupEditProfile.querySelector('.popup__exit-button');

export const popupAddCard = document.querySelector('.popup_type_add-new-element');
export const popupCloseButtonAdd = popupAddCard.querySelector('.popup__exit-button');
export const buttonAddCard = document.querySelector('.profile__button-add');
export const formAddCard = popupAddCard.querySelector('.form');
export const titleInput = formAddCard.querySelector('.form__input-title');
export const linkInput = formAddCard.querySelector('.form__input-link');

export const cardsContainer = document.querySelector('.elements__photo-grid');
export const popupImageView = document.querySelector('.popup_type_view-image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageName = document.querySelector('.popup__image-name');
export const popupImageCloseButton = popupImageView.querySelector('.popup__exit-button');

export const validationParams = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active'
};