export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    // Закрытие попапа клавишей ESC
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
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
    };

    // Открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    // Закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };
};