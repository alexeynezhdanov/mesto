const cardTemplate = document.querySelector('#card').content;
const popupViewImage = document.querySelector('.popup__image');
const popupViewLabel = document.querySelector('.popup__label');
const popupView = document.querySelector('.popup_view');
const ESC_CODE = 'Escape';
const closeButtonPopupView = document.querySelector('.close-view');
 
 export class Card {
    constructor(data) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
    }

    _getTemplate() {
        const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__basket').addEventListener('click', () => {
            this._element.remove();
        });

        this._element.querySelector('.elements__like').addEventListener('click', () => {
            this._like();
        });

        this._element.querySelector('.elements__photo').addEventListener('click', () => {
            this._handleOpenPopup();
        });
    }

    _handleOpenPopup() {
        popupViewImage.src = this._link;
        popupViewImage.alt = this._name;
        popupViewLabel.textContent = this._alt;
        popupView.classList.add('popup_opened');
        closeButtonPopupView.addEventListener('click', () => {
            this._closePopup();
        });
        popupView.addEventListener('click', (evt) => {
            this._closePopupByOverlay(evt);
        });
        document.addEventListener('keydown', (evt) => {
            this._closePopupByEsc(evt);
        });
    };

    _closePopupByEsc(evt) {
        console.log(evt.key)
        if (evt.key === ESC_CODE) {
            this._closePopup();
        };
    };
    
    _closePopupByOverlay(evt) {
        if (!evt.target.closest('.overlay')) {
            this._closePopup();
        };
    };

    _closePopup() {
        popupViewImage.src = '';
        popupViewImage.alt = '';
        popupViewLabel.textContent = '';
        popupView.classList.remove('popup_opened');
    };

    _like() {
        this._element.querySelector('.elements__like').classList.toggle('element__like_active')
    };

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.elements__photo').src = this._link;
        this._element.querySelector('.elements__photo').alt = this._name;
        this._element.querySelector('.elements__caption').textContent = this._name;
        return this._element;
    }
};