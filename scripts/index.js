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
const modal = document.querySelector(".modal");
const exitButton = modal.querySelector(".modal__exit-button");
const profileName = content.querySelector(".profile__name");
const profileDescription = content.querySelector(".profile__description");
const inputName = modal.querySelector("[name='modal-name']");
const inputDescription = modal.querySelector("[name='modal-description']");
const modalForm = document.forms.profile;
const saveButton = modal.querySelector(".modal__save-button");
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");
/* Functions */

function togleModal() {
  modal.classList.toggle("modal_opened");
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  togleModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});

/* Listeners */

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  togleModal();
});

exitButton.addEventListener("click", togleModal);

modalForm.addEventListener("submit", handleProfileSubmitForm);
