export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = containerSelector;
    };
  
    // Добавляет элемент в контейнер
    addItem(element) {
      this._container.prepend(element);
    };
  
    // Отрисовка всех элементов
    renderItems() {
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    };
  };