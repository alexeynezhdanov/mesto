export default class Section {
    constructor({ items, renderer }, container) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = container;
    };
  
    // Добавляет элемент в контейнер
    addItem(item) {
      this._container.prepend(item);
    };
  
    // Отрисовка всех элементов
    renderItems() {
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    };
  };