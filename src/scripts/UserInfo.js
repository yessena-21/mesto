export default class UserInfo {
    constructor({ nameElement, descriptionElement }) {
        this._name = nameElement;
        this._description = descriptionElement;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.username;
        this._description.textContent = data.description;
    }
}