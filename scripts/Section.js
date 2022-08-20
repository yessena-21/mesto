export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._items = data;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item));    
     };

    additem(item) {
        this._container.prepend(item);
    }
}