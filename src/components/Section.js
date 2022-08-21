export default class Section {
    constructor({ renderer }, containerSelector) {
        //this._items = data;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderItems(items) {
        items.forEach(item => this._renderer(item));    
     };

    additem(item) {
        this._container.prepend(item);
    }
}