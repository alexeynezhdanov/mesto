export default class UserInfo {
    constructor({ name, info }) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
    };

    // Возвращаем объект с данными пользователя для подстановки в форму
    getUserInfo() {
        const profile = {
        name: this._name.textContent,
        info: this._info.textContent
        };
        return profile;
    };

    // Добавляем данные пользователя на страницу
    setUserInfo({ name, info }) {
        this._name.textContent = name;
        this._info.textContent = info;
    };
};