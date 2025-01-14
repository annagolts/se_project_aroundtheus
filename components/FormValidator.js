export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }
  _showInputError(inputEl) {
    this._errorMessage = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessage.textContent = inputEl.validationMessage;
    this._errorMessage.classList.add(this._errorClass);
  }
  _hideInputError(inputEl) {
    this._errorMessage = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessage.textContent = inputEl.validationMessage;
    this._errorMessage.classList.remove(this._errorClass);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }
  _hasInvalidInput() {
    return !this._inputElements.every((inputEl) => inputEl.validity.valid);
  }
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this._disableButton(this._submitButton, this._inactiveButtonClass);
      return;
    }
    this._enableButton(this._submitButton, this._inactiveButtonClass);
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._toggleButtonState();
    });
    this._setEventListeners();
  }
}
