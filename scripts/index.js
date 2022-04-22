const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPopupProfile = document.querySelector('.close-profile');
const closeButtonPopupCard = document.querySelector('.close-card');
const closeButtonPopupView = document.querySelector('.close-view');
const saveButtonPopupProfile = document.querySelector('.popup__save-button-profile');
const createButtonPopupCard = document.querySelector('.popup__create-button-card');
const formAddCardElement = document.querySelector('form[name="card-info"]');
const formProfileElement = document.querySelector('form[name="profile-info"]');
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
const ESC_CODE = 'Escape';

// Создание карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const photo = cardElement.querySelector('.elements__photo');
  const caption = cardElement.querySelector('.elements__caption');
  caption.textContent = name;
  photo.src = link;
  photo.alt = name;
  handleImageClickSetListener(photo, caption);
  handleLikeSetListener(cardElement);
  deleteCardSetListener(cardElement);
  return cardElement;
};

function addCard(name, link) {
  const cardElement = createCard(name, link);
  elements.prepend(cardElement);
};

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

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
  closePopup(popupProfile);
};

// Попап Card
function saveCard(event) {
  event.preventDefault();
  addCard(cardName.value, cardLink.value);
  closePopup(popupCard);
  event.target.reset();
};

// Попап View
function handleImageClickSetListener(photo, label) {
  photo.addEventListener('click', function () {
    openPopup(popupView);
    popupViewImage.src = photo.src;
    popupViewImage.alt = label.textContent;
    popupViewLabel.textContent = label.textContent;
  });
};

// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
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

// Лайки
function handleLikeSetListener(cardElement) {
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
};

// Корзина
function deleteCardSetListener(cardElement) {
  const deleteButton = cardElement.querySelector('.elements__basket');
  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.elements__element');
    listItem.remove();
  });
};

// Слушатели
editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', () => openPopup(popupCard));
closeButtonPopupProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonPopupCard.addEventListener('click', () => closePopup(popupCard));
closeButtonPopupView.addEventListener('click', () => closePopup(popupView));
formProfileElement.addEventListener('submit', saveProfile);
formAddCardElement.addEventListener('submit', saveCard);