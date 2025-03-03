export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    handleLike
  ) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLike = handleLike;
    this._id = data._id;
    this._isLiked = data._isLiked && data.likes.length > 0;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this._cardElement);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
  _setLikeButtonState() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_clicked");
    } else {
      this._likeButton.classList.remove("card__like-button_clicked");
    }
  }
  _handleLikeButton() {
    this._handleLike(this._id, this._isLiked)
      .then(() => {
        console.log("Updated Card Data:");
        this._isLiked = !this._isLiked;
        this._likeButton.classList.toggle(
          "card__like-button_clicked",
          this._isLiked
        );
        this._setLikeButtonState();
      })
      .catch((err) => console.error("Error updating like status:", err));
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
    this._setLikeButtonState();
    return this._cardElement;
  }
}
