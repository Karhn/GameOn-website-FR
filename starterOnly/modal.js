function editNav() {
  nav.classList.toggle("responsive")
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const formBalises = document.getElementById("formBalises");
const confirmation = document.getElementById("confirmationContent");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch closing modal event
closeBtn.addEventListener("click", closeModal)

// launch modal form
function launchModal() {
  if (formBalises) {formBalises.classList.remove("hidden")};
  modalbg.style.display = "block";
}

// closing modal form
function closeModal(isConfirmModal) {
  if (isConfirmModal) {
    confirmationContent.style.display = "none";
    resetErrors();
  }
  modalbg.style.display = "none";
}

// html labels link
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationChecked = document.querySelectorAll('input[name="location"]');
const cgu = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");
const form = document.getElementById("reserve-form");
const nav = document.getElementById("myTopnav");

// Validation des champs

// Function prend le nom/prénom en paramètre et valide qu'il est au bon format de 2 caractères minimun
function validerNom(inputElement, labelText) {
  if (inputElement.length < 2) {
    throw new Error(`Le ${labelText.toLowerCase()} doit contenir plus de 2 lettres.`)
  }
}

// Function prend un email en paramètre et valide qu'il est au bon format
function validerEmail(email) {
  let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
  if (!emailRegex.test(email)) {
    throw new Error("L'email n'est pas valide.")
  }
}

// Function prend la date de naissance en paramètre et valide qu'il y a une date de naissance
function validerAnniversaire(inputBirthdate) {
  const value = inputBirthdate.value;
  if (!value) {
    throw new Error ("Vous devez entrer votre date de naissance.")
  }

  const birthDate = new Date(value);
  const minDate = new Date("1900-01-01");

  // Vérifie que la date de naissance est après le 01/01/1900
  if (birthDate < minDate) {
    throw new Error ("La date de naissance doit être postérieure au 1er janvier 1900.")
  }
}

// Function prend le nombre de concours compris entre 0 et 99 et valide qu'il y a un nombre
function validerQuantity(inputQuantity) {
  const value = inputQuantity.value;
  if (!value || value < 0 || value > 99) {
    throw new Error ("Vous devez entrer un nombre de tournois compris entre 0 et 99.")
  }
}

// Function prend la liste de ville jusqu'a trouver celle coché et s'arrete de cherche après
function validerLocation(locationChecked) {
  let isChecked = false;

  for (let i = 0; i < locationChecked.length; i++) {
    if (locationChecked[i].checked) {
      isChecked = true;
      break;
    }
  }
  if (!isChecked) {
    throw new Error("Vous devez choisir une option.");
  }
}

// Function qui vérifie si la checkbox est coché
function validerCheckbox(cgu) {
  if (!cgu.checked) {
    throw new Error("Vous devez vérifier que vous acceptez les termes et conditions.")
  }
}

// Affichage des erreurs
function afficherErreurChamp(champ, message) {
  const container = champ.parentElement;
  container.setAttribute("data-error", message);
  container.setAttribute("data-error-visible", "true");
}

// Réinitialisation des erreurs
function resetErrors() {
  formData.forEach((balise) => {
    balise.removeAttribute("data-error");
    balise.setAttribute("data-error-visible", "false");
  });
}

// Validation globale du formulaire
function valideForm() {
  const firstValid = firstName.value.trim();
  const lastValid = lastName.value.trim();
  const emailValid = email.value.trim();
  let isValid = true;

  resetErrors();

  // Vérification du prénom
  try {
    validerNom(firstValid, "prénom");
  } catch (error) {
    afficherErreurChamp(firstName, error.message);
    isValid = false;
  }

  // Vérification du nom
  try {
    validerNom(lastValid, "nom");
  } catch (error) {
    afficherErreurChamp(lastName, error.message);
   isValid = false;
  }

  // Vérification de l'email
  try {
    validerEmail(emailValid);
  } catch (error) {
    afficherErreurChamp(email, error.message);
    isValid = false
  }

  // Vérification de la date de naissance
  try {
    validerAnniversaire(birthdate);
  } catch (error) {
    afficherErreurChamp(birthdate, error.message);
    isValid = false
  }

  // Vérification du nombre de concours
  try {
    validerQuantity(quantity);
  } catch (error) {
    afficherErreurChamp(quantity, error.message);
    isValid = false
  }

  // Vérification de la ville pour le prochain tournois
  try {
    validerLocation(locationChecked);
  } catch (error) {
    afficherErreurChamp(locationChecked[0], error.message)
    isValid = false
  }

  // Vérification de l'acceptation des CGU
  try {
    validerCheckbox(cgu);
  } catch (error) {
    afficherErreurChamp(cgu, error.message)
    isValid = false
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  if (!valideForm()) {
    event.preventDefault();
    return;
  } 

  formBalises.classList.add("hidden");
  confirmationContent.style.display = "flex";
  form.reset();
  event.preventDefault();
});
