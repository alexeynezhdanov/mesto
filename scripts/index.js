import { Card } from './Cardconstructor.js';
import { FormValidator } from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
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
const template = document.querySelector('#card').content;
const popupViewImage = document.querySelector('.popup__image');
const popupViewLabel = document.querySelector('.popup__label');
const popupView = document.querySelector('.popup_view');
const closeButtons = document.querySelectorAll('.popup__close-button');
const formValidators = {};
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
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function handleCardClick(name, link) {
  popupViewImage.src = link;
  popupViewImage.alt = name;
  popupViewLabel.textContent = name;
  openPopup(popupView);
};

// Обход массива карточек
initialCards.forEach((item) => {
  addCard(item);
});

// Создание новой карточки
function createCard(item) {
  const cardTemplate = template.querySelector('.elements__element').cloneNode(true);
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

// Добавление карточек из массива
function addCard(item) {
  const cardElement = createCard(item);
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
function openPopupCard() {
  cardName.value = '';
  cardLink.value = '';
  openPopup(popupCard);
};

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
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
  formValidators[popup.querySelector('.popup__form').getAttribute('name')].resetValidation();
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

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

// Установка слушателей на крестики
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Остальные слушатели
editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupCard);
formProfileElement.addEventListener('submit', saveProfile);
formAddCardElement.addEventListener('submit', saveCard);