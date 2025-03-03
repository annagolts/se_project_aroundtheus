import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
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
  modalCloseButton,
  likeButton,
} from "../utils/utils.js";
import Api from "../components/API.js";

const popupWithImage = new PopupWithImage({ popupSelector: "#preview" });
popupWithImage.setEventListeners();

/* Validation */

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

/* API */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f3857f09-978d-4c4d-8ac9-210ed16e6fb0",
    "Content-Type": "application/json",
  },
});

/* Get Initial Cards */

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

/* Get User Info and initial cards */

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__image"
);
api
  .getUserInfoAndCards()
  .then(({ userData, cards }) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
    cardSection.renderItems(cards);
  })
  .then((res) => console.log(res))
  .catch((err) => {
    console.error("Error fetching user info:", err);
  });

/* Edit Profile */

const editProfilePopup = new PopupWithForm(
  { popupSelector: "#edit-profile" },
  (formData) => {
    api
      .updateUserProfile("me", {
        name: formData.title,
        about: formData.description,
      })
      .then((updateUserProfile) => {
        userInfo.setUserInfo({
          name: updateUserProfile.name,
          description: updateUserProfile.about,
        });
      })
      .catch((err) => console.error("Error updating user profile:", err));
  }
);
editProfilePopup.setEventListeners();

/* Add New Card */

function addNewCard({ name, link, _id, isLiked }) {
  const card = new Card(
    { name, link, _id, isLiked },
    "#card-template",
    (title, link) => {
      popupWithImage.open(title, link);
    },
    (cardElement) => {
      handleDeleteButton(cardElement, _id);
    },
    (cardId, isLiked) => {
      return api.changeLikeStatus(cardId, isLiked);
    }
  );
  return card.getCardEelement();
}

const addCardPopup = new PopupWithForm(
  { popupSelector: "#new-place" },
  (formData) => {
    api
      .getNewCard({
        name: formData.title,
        link: formData.link,
      })
      .then((newCardData) => {
        const newCard = addNewCard(newCardData);
        cardSection.addItem(newCard, "prepend");
      })
      .catch((err) => console.error("Error adding new card:", err));
  }
);
addCardPopup.setEventListeners();

/* Like/Dislike button */

function handleLike(cardId) {
  api
    .changeLikeStatus(cardId, isLiked)
    .then(() => {
      // likeButton.classList.toggle("card__like-button_clicked");
      if (isLiked) {
        likeButton.classList.add("card__like-button_clicked");
      } else {
        likeButton.classList.remove("card__like-button_clicked");
      }
    })
    .catch((err) => console.error(err));
}

/* Delete Card */
const confirmModal = new PopupWithConfirmation(
  {
    popupSelector: "#confirmationModal",
  },
  api
);

function handleDeleteButton(cardElement, cardId) {
  confirmModal.open();
  confirmModal.setDeleteHandler({ cardElement, cardId });
}

confirmModal.setEventListeners();

/* Event Listeners */

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileName.value = currentUserInfo.name;
  profileDescription.value = currentUserInfo.description;
  editProfileValidation.resetValidation();
  editProfilePopup.open();
});
likeButton.addEventListener("click", handleLike);
