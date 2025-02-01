import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/utils.js";

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

// /* Validation */

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

const userInfo = new UserInfo(".profile__name", ".profile__description");

const popupWithImage = new PopupWithImage({ popupSelector: "#preview" });
popupWithImage.setEventListeners();

function addNewCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", (title, link) => {
    popupWithImage.open(title, link);
  });
  return card.getCardEelement();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = addNewCard(cardItem);
      cardSection.addItem(cardElement);
    },
  },
  cardList
);
cardSection.renderItems();

const editProfilePopup = new PopupWithForm(
  { popupSelector: "#edit-profile" },
  (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      description: formData.description,
    });
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  { popupSelector: "#new-place" },
  (formData) => {
    const newCard = addNewCard({
      name: formData.title,
      link: formData.link,
    });
    cardSection.addItem(newCard);

    addCardValidation._disableButton();
  }
);
addCardPopup.setEventListeners();

editButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileName.value = name;
  profileDescription.value = description;
  editProfileValidation.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});
