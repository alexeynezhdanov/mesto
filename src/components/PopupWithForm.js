import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._element = this._popup.querySelector('.popup__form');
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._handleFormSubmit = handleFormSubmit;
    };

    // Собираем данные всех полей формы
    _getInputValues() {
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
            this.close();
        });
        super.setEventListeners();
    };

    // Данные пользователя подставляем в форму при открытии
    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      };

    // Закрываем попап
    close() {
        super.close();
        this._element.reset();
    };
};