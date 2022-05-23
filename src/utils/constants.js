export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const formAddCardElement = document.querySelector('form[name="card-info"]');
export const formProfileElement = document.querySelector('form[name="profile-info"]');
export const popupProfile = document.querySelector('.popup_profile');
export const popupCard = document.querySelector('.popup_card');
export const profileName = document.querySelector('.profile__name');
export const profileAboutMe = document.querySelector('.profile__about-me');
export const elements = document.querySelector('.elements');
export const ESC_CODE = 'Escape';
export const template = document.querySelector('#card').content;
export const popupViewImage = document.querySelector('.popup__image');
export const popupViewLabel = document.querySelector('.popup__label');
export const popupView = document.querySelector('.popup_view');
export const closeButtons = document.querySelectorAll('.popup__close');
export const formValidators = {};
export const initialCards = [
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
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};