import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }, api) {
    super({ popupSelector });
    this._confirmButton = this._popupElement.querySelector(
      ".modal__confirm-button"
    );
    this._api = api;
    this._handleConfirm = null;
  }

  setDeleteHandler({ cardElement, cardId }) {
    this._confirmButton.removeEventListener("click", this._handleConfirm);
    this._handleConfirm = () => {
      this._api
        .deleteCard(cardId)
        .then(() => {
          cardElement.remove();
          this.close();
        })
        .catch((err) => console.error("Error deleting card", err));
    };
  }
  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }
}
