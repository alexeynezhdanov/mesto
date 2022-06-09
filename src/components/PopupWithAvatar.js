import Popup from './Popup.js';

export default class PopupWithAvatar extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._element = this._popup.querySelector('.popup__form');
        this._inputList = this._element.querySelector('.popup__input');
        this._handleFormSubmit = handleFormSubmit;
    };

    // Добавляем обработчик формы и остальные слушатели
    setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._inputList.value);
        });
        super.setEventListeners();
        this.close();
    };
};