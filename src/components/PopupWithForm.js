import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._formSelector = popupSelector;
        this._element = this._formSelector.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    };

    // Собираем данные всех полей формы
    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    // Добавляем обработчик формы и остальные слушатели
    setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._element.reset();
            this.close();
        });
        super.setEventListeners();
    };

    // Открываем попап
    open() {
        super.open();
    };

    // Закрываем попап
    close() {
        super.close();
    };
};