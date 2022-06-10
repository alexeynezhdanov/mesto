export default class Section {
    constructor({ renderer }, container) {
      this._renderer = renderer;
      this._container = container;
    };
  
    // Добавляет элемент в контейнер
    addItemPrepend(item) {
      this._container.prepend(item);
    };

    // Добавляет элемент в контейнер
    addItemAppend(item) {
      this._container.append(item);
    };
  
    // Отрисовка всех элементов
    renderItems(items, userId) {
      this._renderedItems = items;
      this._renderedItems.forEach(item => {
        this._renderer(item, userId);
      });
    };
  };