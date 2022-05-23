import './pages/index.css';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import {
    elements,
    template,
    initialCards,
    popupView,
    popupCard,
    popupProfile,
    addButton,
    editButton,
    formValidators,
    config,
    formProfileElement,
    formAddCardElement
} from './utils/constants.js';

// Шаблон карточки
function cardElement(item) {
    const cardTemplate = template.querySelector('.elements__element').cloneNode(true);
    const card = new Card(item, cardTemplate, handleCardClick);
    const element = card.generateCard();
    return element;
}

// Отрисовка всех карточек
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(cardElement(item));
    }
}, elements);
cardList.renderItems();

// Попап карточки
const formAddCard = new PopupWithForm({
    popupSelector: popupCard,
    handleFormSubmit: (item) => {
        cardList.addItem(cardElement(item));
    }
});

// Открываем попап добавления карточки
function openPopupCard() {
    cardName.value = '';
    cardLink.value = '';
    formAddCard.open();
    formValidators[formAddCardElement.getAttribute('name')].resetValidation();
};

// Делаем объект по клаасу профиля
const userInfo = new UserInfo({
    name: '.profile__name',
    info: '.profile__about-me'
});

// Данные пользователя подставляем в форму при открытии
function openProfile() {
    formValidators[formProfileElement.getAttribute('name')].resetValidation();
    const profile = userInfo.getUserInfo();
    textName.value = profile.name;
    aboutMe.value = profile.info;
    formProfileUser.open();
}

// Попап профиля пользователя 
const formProfileUser = new PopupWithForm({
    popupSelector: popupProfile,
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
    }
});

// Попап с картинкой
function handleCardClick(name, link) {
    const popup = new PopupWithImage(name, link, popupView);
    popup.open();
    popup.setEventListeners();
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

// Слушатель кнопки попапа добавления карточки
addButton.addEventListener('click', () => { openPopupCard() });

// Слушатель кнопки попапа изменения профиля
editButton.addEventListener('click', () => { openProfile() });

// Остальные слушатели
formAddCard.setEventListeners();
formProfileUser.setEventListeners();