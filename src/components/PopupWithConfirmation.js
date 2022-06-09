import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._element = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    };

    // Добавляем обработчик формы и остальные слушатели
    setSubmitHandler(card, cardId) {
        this._cardId = cardId;
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            card.remove();
            this._handleFormSubmit(this._cardId);
            super.close();
        });
        super.setEventListeners();
    };
};