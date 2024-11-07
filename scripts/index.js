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

const exitButtonEditProfile = modalEditProfle.querySelector(
  ".modal__exit-button"
);
const exitButtonAddNewPLace = modalAddNewPlace.querySelector(
  ".modal__exit-button"
);

const profileName = content.querySelector(".profile__name");
const profileDescription = content.querySelector(".profile__description");
const inputName = modalEditProfle.querySelector("[name='modal-name']");
const inputDescription = modalEditProfle.querySelector(
  "[name='modal-description']"
);
const ProfileForm = document.forms.profile;
const addNewPlaceForm = document.forms.newplace;
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");
const cardTitle = addNewPlaceForm.querySelector("[name='modal-title']");
const cardLink = addNewPlaceForm.querySelector("[name='modal-link']");

/* Functions */

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_clicked");
  });
  trashButton.addEventListener("click", (evt) => {
    evt.target.closest(".card").remove();
  });
  cardImage.addEventListener("click", () => {
    const cardImagePreview = modalPreview.querySelector(".modal__image");
    const cardFigcaption = modalPreview.querySelector(".modal__figcaption");

    cardImagePreview.src = data.link;
    cardImagePreview.alt = data.name;
    cardFigcaption.textContent = data.name;

    openModal(modalPreview);
  });
  const exitButtonPreview = modalPreview.querySelector(".modal__exit-button");
  exitButtonPreview.addEventListener("click", () => closeModal(modalPreview));
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});

function renderNewCard(data) {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
}

/* Handlers */

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
  closeModal(modalAddNewPlace);
}

/* Listeners */

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openModal(modalEditProfle);
});

exitButtonEditProfile.addEventListener("click", () =>
  closeModal(modalEditProfle)
);
ProfileForm.addEventListener("submit", handleProfileSubmitForm);
addNewPlaceForm.addEventListener("submit", handleAddNewCardForm);

addButton.addEventListener("click", () => openModal(modalAddNewPlace));
exitButtonAddNewPLace.addEventListener("click", () =>
  closeModal(modalAddNewPlace)
);
