import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
    elements,
    template,
    profileName,
    addButton,
    editButton,
    formValidators,
    config,
    formProfileElement,
    formAddCardElement,
    editAvatarButton
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
    renderer: (item) => {
        cardList.addItemAppend(cardElement(item));
    }
}, elements);

// Объект по классу профиля
const userInfo = new UserInfo({
    name: '.profile__name',
    info: '.profile__about-me'
});

// Попап редактирования профиля пользователя
const formProfileUser = new PopupWithForm({
    popupSelector: ('.popup_profile'),
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
        formProfileUser.handleButtonSubmit('true', 'Сохраняем...');
        api.changeProfile(item.name, item.info)
            .then(() => {
                formProfileUser.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(_ => {
                formProfileUser.close();
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
                cardList.addItemPrepend(cardElement(result));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(_ => {
                formAddCard.close();
                formAddCard.handleButtonSubmit('false', 'Создать');
            })
    }
});

// Попап изменения аватара
const formChangeAvatar = new PopupWithAvatar({
    popupSelector: ('.popup_avatar'),
    handleFormSubmit: (item) => {
        formChangeAvatar.handleButtonSubmit('true', 'Сохраняем...');
        api.changeAvatar(item)
            .then((result) => {
                document.querySelector('.profile__avatar').src = result.avatar;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(_ => {
                formChangeAvatar.close();
                formChangeAvatar.handleButtonSubmit('false', 'Сохранить');
            })
    }
});

// Попап с картинкой
const imagePopup = new PopupWithImage('.popup_view');
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
        const validator = new FormValidator(formElement, config)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};


// Отрисовка всех карточек
api.getInitialCards()
    .then((result) => {
        cardList.renderItems(result);
    })
    .catch((err) => {
        console.log(err);
    })

// Отрисовка профиля
api.getProfile()
    .then((result) => {
        document.querySelector('.profile__name').textContent = result.name;
        document.querySelector('.profile__about-me').textContent = result.about;
    })
    .catch((err) => {
        console.log(err);
    })

// Шаблон карточки
function cardElement(item) {
    const card = new Card(item, template, handleCardClick, handleClickDelete, statusLike);
    const element = card.generateCard();
    if (profileName.textContent === item.owner.name) {
        card.generateBasket();
    }
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
    }
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