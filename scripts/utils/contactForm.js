
const modalBtn = document.querySelector(".contact_button");
modalBtn.addEventListener("click", displayModal);

const closeBtn = document.querySelector(".close-contact");
closeBtn.addEventListener("click", closeModal);


function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


// // declaration Regex
// let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// // var recuperation
// let firstname = document.getElementById("first");
// let lastname = document.getElementById("last");
// let email = document.getElementById("email");
// let message = document.getElementById("message");