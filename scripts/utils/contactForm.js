
const modalBtn = document.querySelector(".contact_button");

const closeBtn = document.querySelector(".close-contact");


const modal = document.getElementById("contact_modal");
const content = document.querySelector(".content");
const body = document.querySelector("#body");

const formData = document.querySelectorAll(".formData");

const firstFocus = document.querySelector(".close-btn");

const sendBtn = document.getElementById("send");
const contactForm = document.getElementById("contact-form");

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
  firstFocus.focus();
  keyControls();
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", 'true');
  content.setAttribute("aria-hidden", 'false');
  body.classList.remove("no-scroll");
  modalBtn.focus();
}

function keyControls(){
  modal.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    
    if (event.key === "Escape" || event.key === "Esc"){
      closeModal();
    }
  }
)}
  
modalBtn.addEventListener("click", displayModal);

closeBtn.addEventListener("click", closeModal);

sendBtn.addEventListener("click", submitContactForm);


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
