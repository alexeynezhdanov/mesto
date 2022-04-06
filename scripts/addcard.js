let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtonPopupProfile = document.querySelector('.popup__close-button_profile');
let closeButtonPopupCard = document.querySelector('.popup__close-button_card');
let popup = document.querySelectorAll('.popup');
let popupProfile = document.querySelector('.popup_profile');
let popupCard = document.querySelector('.popup_card');
let textName = document.getElementById('textName');
let aboutMe = document.getElementById('aboutMe');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let formInfo = document.querySelector('form[name="profile-info"]');
let formCard = document.querySelector('form[name="card-info"]');
const elements = document.querySelector('.elements');

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
console.log(initialCards);

function showAllCards () {
  initialCards.forEach((i) => {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__name').textContent = i.name;
  cardElement.querySelector('.elements__photo').src = i.link;
  elements.prepend(cardElement);
});
};

function addCard (popup) {
  popup.preventDefault();
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__name').textContent = cardName.value;
  cardElement.querySelector('.elements__photo').src = cardLink.value;
  elements.prepend(cardElement);
  console.log('Записали карточку');
  clickCloseButtonCard();
};

showAllCards();

formCard.addEventListener('submit', addCard);


function clickOpenPopupProfile() {
  console.log('Мы кликнули по элементу openPopupProfile');
  textName.value = profileName.textContent;
  aboutMe.value = profileAboutMe.textContent;
  popupProfile.classList.add('popup_opened');
};

function clickCloseButtonProfile() {
  console.log('Мы кликнули по элементу Close');
  popupProfile.classList.remove('popup_opened');
};

function addProfile(popup) {
  popup.preventDefault();
  profileName.textContent = textName.value;
  profileAboutMe.textContent = aboutMe.value;
  clickCloseButtonProfile();
};

function clickOpenPopupCard() {
  console.log('Мы кликнули по элементу openPopupCard');
  popupCard.classList.add('popup_opened');
};

function clickCloseButtonCard() {
  console.log('Мы кликнули по элементу Close');
  popupCard.classList.remove('popup_opened');
};

editButton.addEventListener('click', clickOpenPopupProfile);
addButton.addEventListener('click', clickOpenPopupCard);
closeButtonPopupProfile.addEventListener('click', clickCloseButtonProfile);
closeButtonPopupCard.addEventListener('click', clickCloseButtonCard);
formInfo.addEventListener('submit', addProfile);