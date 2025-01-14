export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }
  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_clicked");
  }
  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardEelement() {
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__text").textContent = this._name;
    return this._cardElement;
  }
}
