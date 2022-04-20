const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPopupProfile = document.querySelector('.close-profile');
const closeButtonPopupCard = document.querySelector('.close-card');
const closeButtonPopupView = document.querySelector('.close-view');
const saveButtonCard = document.querySelector('form[name="card-info"]');
const saveButtonProfile = document.querySelector('form[name="profile-info"]');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupView = document.querySelector('.popup_view');
const textName = document.getElementById('textName');
const aboutMe = document.getElementById('aboutMe');
const cardName = document.getElementById('cardName');
const cardLink = document.getElementById('cardLink');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;;
const popupViewImage = document.querySelector('.popup__image');
const popupViewLabel = document.querySelector('.popup__label');

// Исходный массив карточек
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

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const photo = cardElement.querySelector('.elements__photo');
  const caption = cardElement.querySelector('.elements__caption');
  caption.textContent = name;
  photo.src = link;
  photo.alt = name;
  handleImageClick(photo, caption);
  handleLikes(cardElement);
  deleteCard(cardElement);
  return cardElement;
};

function addCard(name, link) {
  const cardElement = createCard(name, link);
  elements.prepend(cardElement);
};

function showInitialCards() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
};
showInitialCards();

// Попап Profile
function openPopupProfile() {
  textName.value = profileName.textContent;
  aboutMe.value = profileAboutMe.textContent;
  openPopup(popupProfile);
};

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = textName.value;
  profileAboutMe.textContent = aboutMe.value;
 if (!saveButtonProfile.querySelector('.popup__button_disabled')) {
  closePopupProfile();
 };
};

function closePopupProfile() {
  closePopup(popupProfile);
};

// Попап Card
function openPopupCard() {
  openPopup(popupCard);
};

function saveCard(event) {
  event.preventDefault();
  if (!saveButtonCard.querySelector('.popup__button_disabled')) {
    addCard(cardName.value, cardLink.value);
    closePopupCard();
   };
   event.target.reset();
};

function closePopupCard() {
  closePopup(popupCard);
};

// Попап View
function handleImageClick(photo, label) {
  photo.addEventListener('click', function () {
    openPopup(popupView);
    popupViewImage.src = photo.src;
    popupViewImage.alt = label.textContent;
    popupViewLabel.textContent = label.textContent;
  });
};

function closePopupView() {
  closePopup(popupView);
};

// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeVariants);
  document.addEventListener('keydown', closeVariants);
};

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Лайки
function handleLikes(cardElement) {
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
};

// Корзина
function deleteCard(cardElement) {
  const deleteButton = cardElement.querySelector('.elements__basket');
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.elements__element');
    listItem.remove();
  });
};

// Закрытие по esc и оверлей
function closeVariants (evt) {
  if ((!evt.target.closest('.overlay')) || (evt.keyCode === 27)) {
    closePopupProfile();
    closePopupCard();
    closePopupView();
  };
};

// Слушатели
editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupCard);
closeButtonPopupProfile.addEventListener('click', closePopupProfile);
closeButtonPopupCard.addEventListener('click', closePopupCard);
closeButtonPopupView.addEventListener('click', closePopupView);
saveButtonProfile.addEventListener('submit', saveProfile);
saveButtonCard.addEventListener('submit', saveCard);