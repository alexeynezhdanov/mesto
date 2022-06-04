import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithDeletion from '../components/PopupWithDeletion.js';
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
    const card = new Card(item, template, handleCardClick, handleClickDelete);
    const element = card.generateCard();
    return element;
}

fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
    headers: {
        authorization: 'b9b00096-e4e2-4fb1-a472-dd725ac3dacf'
    }
})
    .then(res => res.json())
    .then((result) => {

        const getcard = result;
        console.log(getcard);

        // Отрисовка всех карточек
        const cardList = new Section({
            items: getcard,
            renderer: (item) => {
                cardList.addItem(cardElement(item));
            }
        }, elements);
        cardList.renderItems();
    });

function post(name, link) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
        method: 'POST',
        headers: {
            authorization: 'b9b00096-e4e2-4fb1-a472-dd725ac3dacf',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`
        })
    });
};

// Попап карточки
const formAddCard = new PopupWithForm({
    popupSelector: ('.popup_card'),
    handleFormSubmit: (item) => {
        /*cardList.addItem(cardElement(item));*/
        post(item.name, item.link)
    }
});

// Открываем попап добавления карточки
function openPopupCard() {
    formAddCard.open();
    formValidators[formAddCardElement.getAttribute('name')].resetValidation();
};

fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
    headers: {
        authorization: 'b9b00096-e4e2-4fb1-a472-dd725ac3dacf'
    }
})
    .then(res => res.json())
    .then((result) => {
        document.querySelector('.profile__name').textContent = result.name;
        document.querySelector('.profile__about-me').textContent = result.about;
    });

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
};

function patch(name, about) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'b9b00096-e4e2-4fb1-a472-dd725ac3dacf',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`
        })
    });
};

// Попап профиля пользователя 
const formProfileUser = new PopupWithForm({
    popupSelector: ('.popup_profile'),
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
        patch(item.name, item.info);
        console.log(item);
    }
});

// Попап с картинкой
const imagePopup = new PopupWithImage('.popup_view');
function handleCardClick(name, link) {
    imagePopup.open(name, link);
};

// Попап с подтверждением удаления
const сonfirmDeletion = new PopupWithDeletion('.popup_confirm-deletion');

// Открываем попап подтверждения удаления карточки
function handleClickDelete() {
    сonfirmDeletion.open();
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