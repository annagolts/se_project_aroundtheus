export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedCards = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderItems() {
    this._renderedCards.forEach((item) => this._renderer(item));
  }
  addItem(element, method = "append") {
    this._container[method](element);
  }
}
