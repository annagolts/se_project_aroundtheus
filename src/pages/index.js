import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  content,
  editButton,
  addButton,
  profileName,
  profileDescription,
  profileForm,
  addNewPlaceForm,
} from "../utils/utils.js";

/* Elements */

// /* Validation */

const editProfileValidation = new FormValidator(
  validationSettings,
  profileForm
);
editProfileValidation.enableValidation();

const addCardValidation = new FormValidator(
  validationSettings,
  addNewPlaceForm
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
  ".cards__list"
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
    cardSection.addItem(newCard, "prepend");

    // addCardValidation._disableButton();
  }
);
addCardPopup.setEventListeners();

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileName.value = currentUserInfo.name;
  profileDescription.value = currentUserInfo.description;
  editProfileValidation.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});
