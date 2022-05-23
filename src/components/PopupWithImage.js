import Popup from './Popup.js';
import {
    popupViewImage,
    popupViewLabel
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(name, link, popupSelector) {
        super(popupSelector);
        this._image = popupViewImage;
        this._label = popupViewLabel;
        this._name = name;
        this._link = link;
    };

    // Вставляем картинку и подпись и открываем попап
    open() {
        this._image.src = this._link;
        this._image.alt = this._name;
        this._label.textContent = this._name;
        super.open();
    };
};