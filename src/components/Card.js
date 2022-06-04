export default class Card {
    constructor(data, cardSelector, handleCardClick, handleClickDelete) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleClickDelete = handleClickDelete;
        this._cardTemplate = cardSelector.querySelector('.elements__element').cloneNode(true);
    };

    // Ставим слушатели
    _setEventListeners() {
        this._elementPhoto = this._element.querySelector('.elements__photo');
        this._elementCaption = this._element.querySelector('.elements__caption');
        this._elementBasket = this._element.querySelector('.elements__basket');
        this._elementLike = this._element.querySelector('.elements__like');
        this._elementLikesSum = this._element.querySelector('.elements__likes-sum');
        this._elementBasket.addEventListener('click', () => {
            this._handleClickDelete;
        });
        this._elementLike.addEventListener('click', () => {
            this._like();
        });
        this._elementPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };

    // Логика лайка
    _like() {
        this._elementLike.classList.toggle('element__like_active');
    };

    // Формируем карточку
    generateCard() {
        this._element = this._cardTemplate;
        this._setEventListeners();
        this._elementPhoto.src = this._link;
        this._elementPhoto.alt = this._name;
        this._elementCaption.textContent = this._name;
        this._elementLikesSum.textContent = this._likes.length;
        console.log(this._elementLikesSum)
        return this._element;
    };
};