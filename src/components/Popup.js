import { ESC_CODE } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._closeButton = this._popup.querySelector('.popup__close');
    };

    // Закрытие попапа клавишей ESC
    _handleEscClose(evt) {
        if (evt.key === ESC_CODE) {
            this.close();
        };
    };

    // Установка слушателей
    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', (evt) => {
            if (!evt.target.closest('.overlay')) {
                this.close();
            }
        });
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    };

    // Открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
    };

    // Закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');
    };
};