import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleSubmitForm) {
    super({ popupSelector });

    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popupElement.querySelector(".modal__container");
  }
  _getInputValues() {
    const inputValues = {};
    const inputList = this._popupForm.querySelectorAll(".modal__input");
    inputList.forEach((input) => {
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
      this._popupForm.reset();
      super.close();
    });
  }
}
