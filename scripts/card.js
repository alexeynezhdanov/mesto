export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = cardSelector;
    }

    _setEventListeners() {
        this._elementPhoto = this._element.querySelector('.elements__photo');
        this._elementCaption = this._element.querySelector('.elements__caption');
        this._elementBasket = this._element.querySelector('.elements__basket');
        this._elementLike = this._element.querySelector('.elements__like');
        this._elementBasket.addEventListener('click', () => {
            this._element.remove();
        });
        this._elementLike.addEventListener('click', () => {
            this._like();
        });
        
        this._elementPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _like() {
        this._elementLike.classList.toggle('element__like_active');
    };
    
// Публичный метод создания карточки
    generateCard() {
        this._element = this._cardTemplate;
        this._setEventListeners();
        this._elementPhoto.src = this._link;
        this._elementPhoto.alt = this._name;
        this._elementCaption.textContent = this._name;
        return this._element;
    }
};