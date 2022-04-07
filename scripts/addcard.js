let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtonPopupProfile = document.querySelector('.popup__close-button_profile');
let closeButtonPopupCard = document.querySelector('.popup__close-button_card');
let popupProfile = document.querySelector('.popup_profile');
let popupCard = document.querySelector('.popup_card');
let textName = document.getElementById('textName');
let aboutMe = document.getElementById('aboutMe');
let cardName = document.getElementById('cardName');
let cardLink = document.getElementById('cardLink');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');


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

function addCard (name, link) {
  const elements = document.querySelector('.elements');
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__name').textContent = name;
  cardElement.querySelector('.elements__photo').src = link;
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt){
    console.log('Мы кликнули по элементу Like');
    evt.target.classList.toggle('element__like_active');
  });
  const deleteButton = cardElement.querySelector('.elements__basket');
  deleteButton.addEventListener('click', function () {
  console.log('Мы кликнули по элементу Basket');
  const listItem = deleteButton.closest('.elements__element');
  listItem.remove();
});
  elements.prepend(cardElement);
};

function showInitialCards () {
  initialCards.forEach((i) => {
addCard(i.name, i.link);
});
};
showInitialCards();

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
  clickCloseButtonProfile();
};

function clickOpenPopupCard () {
  console.log('Мы кликнули по элементу openPopupCard');
  popupCard.classList.add('popup_opened');
};

function clickCloseButtonCard () {
  console.log('Мы кликнули по элементу Close');
  popupCard.classList.remove('popup_opened');
};

function clickLike () {
  console.log('Мы кликнули по элементу Like');
  let likeButton = cardElement.querySelectorAll('.elements__like');
  likeButton.classList.add('element__like_active');
};

editButton.addEventListener('click', clickOpenPopupProfile);
addButton.addEventListener('click', clickOpenPopupCard);
closeButtonPopupProfile.addEventListener('click', clickCloseButtonProfile);
closeButtonPopupCard.addEventListener('click', clickCloseButtonCard);
document.querySelector('form[name="profile-info"]').addEventListener('submit', addProfile);
document.querySelector('form[name="card-info"]').addEventListener('submit', function (popupCard) {
  popupCard.preventDefault();
  addCard(cardName.value, cardLink.value);
  cardName.value = '';
  cardLink.value = '';
});