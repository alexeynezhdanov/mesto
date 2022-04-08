let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtonPopupProfile = document.querySelector('.popup__close-button_profile');
let closeButtonPopupCard = document.querySelector('.popup__close-button_card');
let closeButtonPopupView = document.querySelector('.popup__close-button_view');
let popupProfile = document.querySelector('.popup_profile');
let popupCard = document.querySelector('.popup_card');
let popupView = document.querySelector('.popup_view');
let textName = document.getElementById('textName');
let aboutMe = document.getElementById('aboutMe');
let cardName = document.getElementById('cardName');
let cardLink = document.getElementById('cardLink');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');

/* Исходный массив карточек */
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

/* Добавление карточки */
function addCard (name, link) {
  const elements = document.querySelector('.elements');
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__name').textContent = name;
  cardElement.querySelector('.elements__photo').src = link;

/* Лайк */
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt){
    console.log('Мы кликнули по элементу Like');
    evt.target.classList.toggle('element__like_active');
  });

/* Корзина */
  const deleteButton = cardElement.querySelector('.elements__basket');
  deleteButton.addEventListener('click', function () {
  console.log('Мы кликнули по элементу Basket');
  const listItem = deleteButton.closest('.elements__element');
  listItem.remove();
  });

/* Попап View */
  cardElement.querySelector('.elements__photo').addEventListener('click', function () {
  console.log('Мы кликнули по элементу photo');
  popupView.classList.add('popup_opened');
  document.querySelector('.popup__image').src = cardElement.querySelector('.elements__photo').src;
  document.querySelector('.popup__label').textContent = cardElement.querySelector('.elements__name').textContent;
  });

  elements.prepend(cardElement);
};

function showInitialCards () {
  initialCards.forEach((i) => {
addCard(i.name, i.link);
});
};
showInitialCards();

/* Попап профиля */
function clickOpenPopupProfile () {
  console.log('Мы кликнули по элементу openPopupProfile');
  textName.value = profileName.textContent;
  aboutMe.value = profileAboutMe.textContent;
  popupProfile.classList.add('popup_opened');
};

function clickCloseButtonProfile () {
  console.log('Мы кликнули по элементу Close');
  popupProfile.classList.remove('popup_opened');
};

function addProfile (popupProfile) {
  popupProfile.preventDefault();
  profileName.textContent = textName.value;
  profileAboutMe.textContent = aboutMe.value;
  clickCloseButtonProfile ();
};

/* Попап карточки */
function clickOpenPopupCard () {
  console.log('Мы кликнули по элементу openPopupCard');
  popupCard.classList.add('popup_opened');
};

function clickCloseButtonCard () {
  console.log('Мы кликнули по элементу Close');
  popupCard.classList.remove('popup_opened');
};

/* Закрытие попапа просмотра изображений */
function clickCloseButtonView () {
  console.log('Мы кликнули по элементу Close');
  popupView.classList.remove('popup_opened');
};

/* Слушатели */
editButton.addEventListener('click', clickOpenPopupProfile);
addButton.addEventListener('click', clickOpenPopupCard);
closeButtonPopupProfile.addEventListener('click', clickCloseButtonProfile);
closeButtonPopupCard.addEventListener('click', clickCloseButtonCard);
closeButtonPopupView.addEventListener('click', clickCloseButtonView);
document.querySelector('form[name="profile-info"]').addEventListener('submit', addProfile);
document.querySelector('form[name="card-info"]').addEventListener('submit', function (popupCard) {
  popupCard.preventDefault();
  addCard(cardName.value, cardLink.value);
  cardName.value = '';
  cardLink.value = '';
  clickCloseButtonCard ();
});