
const modalBtn = document.querySelector(".contact_button");
modalBtn.addEventListener("click", displayModal);

const closeBtn = document.querySelector(".close-contact");
closeBtn.addEventListener("click", closeModal);

const modal = document.getElementById("contact_modal");
const content = document.querySelector(".content");
const body = document.querySelector("#body");

const formData = document.querySelectorAll(".formData");

var firstFocus = document.querySelector(".close-btn");

let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let nameRegex = /^[A-Za-zéèïùçü\- ]{2,255}$/;

let firstname = document.getElementById("first");
let lastname = document.getElementById("last");
let email = document.getElementById("email");
let message = document.getElementById("message");

function displayModal() {
	modal.style.display = "block";
  content.setAttribute("aria-hidden", 'true');
  modal.setAttribute("aria-hidden", 'false');
  body.classList.add("no-scroll");
  setTimeout(() => {
    firstFocus.focus();
  }, 500); 
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", 'true');
  content.setAttribute("aria-hidden", 'false');
  body.classList.remove("no-scroll");
  modalBtn.focus();
}

window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        // Do something for "down arrow" key press.
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        // Do something for "up arrow" key press.
        break;
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        // Do something for "left arrow" key press.
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        // Do something for "right arrow" key press.
        break;
      case "Enter":
        // Do something for "enter" or "return" key press.
        break;
      case "Esc": // IE/Edge specific value
      case "Escape":
        // Do something for "esc" key press.
        closeModal();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
  

const sendBtn = document.getElementById("send");

sendBtn.addEventListener("click", submitContactForm);

const contactForm = document.getElementById("contact-form");

function submitContactForm() {

  const firstNameIsTrue = verifFirstName();
  const lastNameIsTrue = verifLastName();
  const emailIsTrue = verifEmail();
  const messageIsTrue = verifMessage();


  if(firstNameIsTrue && lastNameIsTrue && emailIsTrue && messageIsTrue) {
    console.log("Bonjour " + firstname.value + " " + lastname.value + ", \nVotre message a bien été envoyé au photographe.\nVeuillez retrouver votre message ci-dessous :\n \"" + message.value + "\" \nUne copie de ce message vous sera envoyée à \n" + email.value);
    contactForm.reset();
    closeModal();
  }
}

function verifFirstName() {
  if(nameRegex.test(firstname.value)){
    formData[0].setAttribute("data-error-visible",false);
    formData[0].setAttribute("data-error","");
    return true;
  } else{
    formData[0].setAttribute("data-error-visible",true);
    formData[0].setAttribute("data-error","Prénom incorrect, saisir 2 lettres min.");
    return false;
  }
}

function verifLastName() {
  if(nameRegex.test(lastname.value)){
    formData[1].setAttribute("data-error-visible",false);
    formData[1].setAttribute("data-error","");
    return true;
  } else{
    formData[1].setAttribute("data-error-visible",true);
    formData[1].setAttribute("data-error","Nom incorrect, saisir 2 lettres min.");
    return false;
  }
}

function verifEmail() {
  if(emailRegex.test(email.value)){
    formData[2].setAttribute("data-error-visible",false);
    formData[2].setAttribute("data-error","");
    return true;
  } else{
    formData[2].setAttribute("data-error-visible",true);
    formData[2].setAttribute("data-error","Email incorrect");
    return false;
  }
}

function verifMessage() {
  if(message.value != ''){
    formData[3].setAttribute("data-error-visible",false);
    formData[3].setAttribute("data-error","");
    return true;
  } else{
    formData[3].setAttribute("data-error-visible",true);
    formData[3].setAttribute("data-error","Message vide");
    return false;
  }
}