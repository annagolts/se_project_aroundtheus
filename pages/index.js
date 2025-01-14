import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Loiuse",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Elements */

const content = document.querySelector(".content");
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const modalEditProfle = document.querySelector("#edit-profile");
const modalAddNewPlace = document.querySelector("#new-place");
const modalPreview = document.querySelector("#preview");
const profileName = content.querySelector(".profile__name");
const profileDescription = content.querySelector(".profile__description");
const inputName = modalEditProfle.querySelector("[name='modal-name']");
const inputDescription = modalEditProfle.querySelector(
  "[name='modal-description']"
);
const profileForm = document.forms.profile;
const addNewPlaceForm = document.forms.newplace;
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");
const cardTitle = addNewPlaceForm.querySelector("[name='modal-title']");
const cardLink = addNewPlaceForm.querySelector("[name='modal-link']");
const cardImagePreview = modalPreview.querySelector(".modal__image");
const cardFigcaption = modalPreview.querySelector(".modal__figcaption");

/* Validation */

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileValidation = new FormValidator(
  validationSettings,
  modalEditProfle
);
editProfileValidation.enableValidation();

const addCardValidation = new FormValidator(
  validationSettings,
  modalAddNewPlace
);
addCardValidation.enableValidation();

/* Functions */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
  modal.addEventListener("click", handleOverlay);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
  modal.removeEventListener("click", handleOverlay);
}

function renderNewCard(data, method = "prepend") {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.getCardEelement();
  cardList[method](cardElement);
}

initialCards.forEach((data) => renderNewCard(data, "append"));

/* Handlers */

function handleImageClick({ name, link }) {
  cardImagePreview.src = link;
  cardImagePreview.alt = name;
  cardFigcaption.textContent = name;

  openModal(modalPreview);
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(modalEditProfle);
}

function handleAddNewCardForm(evt) {
  evt.preventDefault();
  const name = cardTitle.value;
  const link = cardLink.value;

  renderNewCard({ name, link });
  evt.target.reset();
  closeModal(modalAddNewPlace);
}

function handleCloseButtons() {
  const closeButton = document.querySelectorAll(".modal__exit-button");
  closeButton.forEach((button) => {
    const modalPopup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(modalPopup));
  });
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}
function handleOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.currentTarget);
  }
}

/* Listeners */

handleCloseButtons();

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openModal(modalEditProfle);
});

profileForm.addEventListener("submit", handleProfileSubmitForm);
addNewPlaceForm.addEventListener("submit", handleAddNewCardForm);

addButton.addEventListener("click", () => openModal(modalAddNewPlace));
