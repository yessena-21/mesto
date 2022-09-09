export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            username: this._name.textContent,
            description: this._description.textContent,
            avatar: this._avatar.link
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.about;
        this._avatar.src = data.avatar;
    }
}