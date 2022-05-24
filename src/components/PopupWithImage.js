import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._label = this._popup.querySelector('.popup__label');
        
    };

    // Вставляем картинку и подпись и открываем попап
    open(name, link) {
        this._name = name;
        this._link = link;
        this._image.src = this._link;
        this._image.alt = this._name;
        this._label.textContent = this._name;
        super.open();
    };
};