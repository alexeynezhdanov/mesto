export default class UserInfo {
    constructor({ name, about }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
    };

    // Возвращаем объект с данными пользователя для подстановки в форму
    getUserInfo() {
        const profile = {
        name: this._name.textContent,
        about: this._about.textContent
        };
        return profile;
    };

    // Добавляем данные пользователя на страницу
    setUserInfo({ name, about }) {
        if(name) {this._name.textContent = name;};
        if(about) {this._about.textContent = about;};
    };
};