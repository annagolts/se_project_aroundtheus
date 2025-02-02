export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_clicked");
  }
  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardEelement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__text").textContent = this._name;
    return this._cardElement;
  }
}
