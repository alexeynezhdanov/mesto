import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
    elements,
    template,
    initialCards,
    addButton,
    editButton,
    formValidators,
    config,
    formProfileElement,
    formAddCardElement
} from '../utils/constants.js';

// Шаблон карточки
function cardElement(item) {
    const card = new Card(item, template, handleCardClick);
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
    popupSelector: ('.popup_card'),
    handleFormSubmit: (item) => {
        cardList.addItem(cardElement(item));
    }
});

// Открываем попап добавления карточки
function openPopupCard() {
    formAddCard.open();
    formValidators[formAddCardElement.getAttribute('name')].resetValidation();
};

// Делаем объект по клаасу профиля
const userInfo = new UserInfo({
    name: '.profile__name',
    info: '.profile__about-me'
});

// Открываем попап изменения профиля
function openProfile() {
    formValidators[formProfileElement.getAttribute('name')].resetValidation();
    const profile = userInfo.getUserInfo();
    formProfileUser.setInputValues(profile);
    formProfileUser.open();
}

// Попап профиля пользователя 
const formProfileUser = new PopupWithForm({
    popupSelector: ('.popup_profile'),
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
    }
});

// Попап с картинкой
const imagePopup = new PopupWithImage('.popup_view');
function handleCardClick(name, link) {
    imagePopup.open(name, link);
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
imagePopup.setEventListeners();