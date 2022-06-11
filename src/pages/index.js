import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupImage from '../components/PopupImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
    elements,
    template,
    addButton,
    editButton,
    formValidators,
    config,
    formProfileElement,
    formAddCardElement,
    formAvatarElement,
    editAvatarButton,
    profileAvatar
} from '../utils/constants.js';

// Api
const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/cohort-42`,
    headers: {
        authorization: 'b9b00096-e4e2-4fb1-a472-dd725ac3dacf',
        'Content-Type': 'application/json',
    }
});

// Отрисовка всех карточек
const cardList = new Section({
    renderer: (item, userId) => {
        cardList.addItemAppend(cardElement(item, userId));
    }
}, elements);

// Объект по классу профиля
const userInfo = new UserInfo({
    name: '.profile__name',
    about: '.profile__about-me'
});

// Попап редактирования профиля пользователя
const formProfileUser = new PopupWithForm({
    popupSelector: ('.popup_profile'),
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
        formProfileUser.handleButtonSubmit('true', 'Сохраняем...');
        api.changeProfile(item.name, item.about)
            .then(() => {
                formProfileUser.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(_ => {
                formProfileUser.handleButtonSubmit('false', 'Сохранить');
            })
    }
});

// Попап добавления новой карточки
const formAddCard = new PopupWithForm({
    popupSelector: ('.popup_card'),
    handleFormSubmit: (item) => {
        formAddCard.handleButtonSubmit('true', 'Создаём...');
        api.addNewCard(item.name, item.link)
            .then((result) => {
                cardList.addItemPrepend(cardElement(result, result.owner._id));
                formAddCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(_ => {
                formAddCard.handleButtonSubmit('false', 'Создать');
            })
    }
});

// Попап изменения аватара
const formChangeAvatar = new PopupWithForm({
    popupSelector: ('.popup_avatar'),
    handleFormSubmit: (item) => {
        formChangeAvatar.handleButtonSubmit('true', 'Сохраняем...');
        api.changeAvatar(item)
            .then((result) => {
                profileAvatar.src = result.avatar;
                formChangeAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(_ => {
                formChangeAvatar.handleButtonSubmit('false', 'Сохранить');
            })
    }
});

// Попап с картинкой
const imagePopup = new PopupImage('.popup_view');
function handleCardClick(name, link) {
    imagePopup.open(name, link);
};

// Попап с подтверждением удаления
const сonfirmDeletion = new PopupWithConfirmation({
    popupSelector: ('.popup_confirm-deletion'),
    handleFormSubmit: (id) => {
        api.deleteCard(id)
            .catch((err) => {
                console.log(err);
            })
    }
});

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

// Отрисовка всех карточек
Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([user, cards]) => {
        cardList.renderItems(cards, user._id);
        userInfo.setUserInfo(user);
    })
    .catch((err) => {
        console.log(err);
    })

// Шаблон карточки
function cardElement(item, userId) {
    const card = new Card(item, template, handleCardClick, handleClickDelete, statusLike);
    const element = card.generateCard();
    if (userId === item.owner._id) {
        card.generateBasket();
    };
    item.likes.forEach((like) => {
        if (userId === like._id) {
            card.like();
        };
      });
    return element;
};

// Лайки
function statusLike(id, status) {
    if (status === 'true') {
        api.putLike(id)
            .catch((err) => {
                console.log(err);
            })
    } else {
        api.deleteLike(id)
            .catch((err) => {
                console.log(err);
            })
    };
};

// Открываем попап добавления карточки
function openPopupCard() {
    formAddCard.open();
    formValidators[formAddCardElement.getAttribute('name')].resetValidation();
};

// Открываем попап изменения профиля
function openProfile() {
    formValidators[formProfileElement.getAttribute('name')].resetValidation();
    const profile = userInfo.getUserInfo();
    formProfileUser.setInputValues(profile);
    formProfileUser.open();
};

// Открываем попап подтверждения удаления карточки
function handleClickDelete(card, cardId) {
    сonfirmDeletion.setSubmitHandler(card, cardId);
    сonfirmDeletion.open();
};

// Попап изменения аватара
function openPopupAvatar() {
    formValidators[formAvatarElement.getAttribute('name')].resetValidation();
    formChangeAvatar.open();
};

enableValidation(config);

// Слушатель кнопки попапа добавления карточки
addButton.addEventListener('click', () => { openPopupCard() });

// Слушатель кнопки попапа изменения профиля
editButton.addEventListener('click', () => { openProfile() });

// Слушатель кнопки попапа изменения аватара
editAvatarButton.addEventListener('click', () => { openPopupAvatar() });

// Остальные слушатели
formAddCard.setEventListeners();
formProfileUser.setEventListeners();
imagePopup.setEventListeners();
formChangeAvatar.setEventListeners();