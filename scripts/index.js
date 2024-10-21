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
const inputName = modal.querySelector(".modal__name");
const inputDescription = modal.querySelector(".modal__description");
const modalForm = modal.querySelector(".modal__container");
const saveButton = modal.querySelector(".modal__save-button");
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".cards__list");
/* Functions */

function modalButtonsClickReaction() {
  modal.classList.toggle("modal_opened");
}
inputName.value = profileName.textContent;
inputDescription.value = profileDescription.textContent;

function handleProfileSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
}
modalForm.addEventListener("submit", handleProfileSubmitForm);
saveButton.addEventListener("click", modalButtonsClickReaction);

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
editButton.addEventListener("click", modalButtonsClickReaction);
exitButton.addEventListener("click", modalButtonsClickReaction);
