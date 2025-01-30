import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleSubmitForm) {
    super({ popupSelector });

    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleSubmitForm(inputValues);
    });
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
}
