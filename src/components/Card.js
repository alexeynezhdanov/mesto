export default class Card {
    constructor(data, cardSelector, handleCardClick, handleClickDelete, statusLike) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        this._id = data._id;
        this._statusLike = statusLike;
        this._handleCardClick = handleCardClick;
        this._handleClickDelete = handleClickDelete;
        this._cardTemplate = cardSelector.querySelector('.elements__element').cloneNode(true);
    };

    // Ставим слушатели
    _setEventListeners() {
        this._elementPhoto = this._element.querySelector('.elements__photo');
        this._elementCaption = this._element.querySelector('.elements__caption');
        this._elementPlace = this._element.querySelector('.elements__place');
        this._elementLike = this._element.querySelector('.elements__like');
        this._elementLikesSum = this._element.querySelector('.elements__likes-sum');
        this._elementLike.addEventListener('click', () => {
            this._like();
        });
        this._elementPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };

    // Логика лайка
    _like() {
        if (!this._elementLike.classList.contains('element__like_active')) {
            this._statusLike(this._id, 'true');
            this._elementLike.classList.add('element__like_active');
            this._elementLikesSum.textContent = this._likes.length + 1;
        } else {
            this._statusLike(this._id, 'false');
            this._elementLike.classList.remove('element__like_active');
            this._elementLikesSum.textContent = this._likes.length;
        }
    };

    // Формируем корзину на своих карточках
    generateBasket() {
        this._elementPlace.insertAdjacentHTML('afterbegin', '<button type="button" class="elements__basket"></button>');
        this._elementBasket = this._element.querySelector('.elements__basket');
        this._elementBasket.addEventListener('click', () => {
            this._handleClickDelete(this._element, this._id);
        });
    };

    // Формируем карточку
    generateCard() {
        this._element = this._cardTemplate;
        this._setEventListeners();
        this._elementPhoto.src = this._link;
        this._elementPhoto.alt = this._name;
        this._elementCaption.textContent = this._name;
        this._elementLikesSum.textContent = this._likes.length;
        return this._element;
    };
};