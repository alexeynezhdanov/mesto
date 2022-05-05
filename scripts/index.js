import { Card } from './card.js';
import { FormValidator } from './validate.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPopupProfile = document.querySelector('.close-profile');
const closeButtonPopupCard = document.querySelector('.close-card');
const formAddCardElement = document.querySelector('form[name="card-info"]');
const formProfileElement = document.querySelector('form[name="profile-info"]');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const textName = document.getElementById('textName');
const aboutMe = document.getElementById('aboutMe');
const cardName = document.getElementById('cardName');
const cardLink = document.getElementById('cardLink');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const elements = document.querySelector('.elements');
const ESC_CODE = 'Escape';

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

const settingValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


// Добавление карточек из массива
initialCards.forEach((item) => {
  addCard(item);
});

// Создание новой карточки
function addCard(item) {
  const card = new Card(item);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
};

// Попап Profile
function openPopupProfile() {
  textName.value = profileName.textContent;
  aboutMe.value = profileAboutMe.textContent;
  openPopup(popupProfile);
};

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = textName.value;
  profileAboutMe.textContent = aboutMe.value;
  closePopup(popupProfile);
};

// Попап Card
function saveCard(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = cardName.value;
  newCard.link = cardLink.value;
  addCard(newCard);
  closePopup(popupCard);
  evt.target.reset();
};

// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
  const formElement = popup.querySelector('.popup__form');
  validation(settingValidation, formElement);
};

// Закрытие Esc
function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// Закрытие по оверлей
function closeByOverlay(evt) {
  if (!evt.target.closest('.overlay')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closeByEsc);
};

// Слушатели
editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', () => openPopup(popupCard));
closeButtonPopupProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonPopupCard.addEventListener('click', () => closePopup(popupCard));
formProfileElement.addEventListener('submit', saveProfile);
formAddCardElement.addEventListener('submit', saveCard);

// Валидация карточки
function validation(settingValidation, formElement) {
  const form = new FormValidator(settingValidation, formElement);
  form.enableValidation();
};