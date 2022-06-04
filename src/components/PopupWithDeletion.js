import Popup from './Popup.js';

export default class PopupWithDeletion extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._element = this._popup.querySelector('.popup__form');
    }

    // Добавляем обработчик формы и остальные слушатели
    setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.close();
        });
        super.setEventListeners();
    }

    // Закрываем попап
    close() {
        super.close();
        this._element.reset();
    }
};