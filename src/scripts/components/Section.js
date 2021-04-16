export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    // Метод рендеринга элементов
    renderItem(elements) {
        elements.forEach((element) => {
            this._renderer(element);
        });
    }

    // Метод добавления элемента в конец списка
    appendItem(element) {
        this._container.append(element);
    }

    // Метод добавления элемента в начало списка
    prependItem(element) {
        this._container.prepend(element);
    }
}