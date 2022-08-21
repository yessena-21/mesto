export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        console.log(this._name);
        console.log(this._description);
    }

    getUserInfo() {
        return {
            username: this._name.textContent,
            description: this._description.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.username;
        this._description.textContent = data.description;
    }
}