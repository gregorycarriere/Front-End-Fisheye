import photographerFactory from "../factories/photographer.js";
import { mediaFactory } from "../factories/photographer.js";


var params = (new URL(document.location)).searchParams;
const idPhotographer = params.get('id');

let mediaBox = [];

const selectTri = document.getElementById('tri-dropdown');

let numberLikes = 0;

let currIndex = 0;

const mediaSection = document.querySelector(".media_section");

var allMediasLikes = document.querySelector(".aside-like-count");

const lightbox = document.querySelector(".lightbox");
const closeBtnLightbox = document.querySelector(".lightbox__close");
const zoneLightbox = document.querySelector(".lightbox__container");

const nextBtnLightbox = document.querySelector(".lightbox__next");
const prevBtnLightbox = document.querySelector(".lightbox__prev");

const body = document.querySelector("#body");
const content = document.querySelector(".content");

const getPhotographersData = async() => {
    return await fetch('data/photographers.json')
    .then(function(result) { return result.json() })
    .then(function(data){ return data })
    .catch(function(error){ console.log('une erreur fetch' + error)})
};


async function displayProfile(photographer){

    const photographerModel = photographerFactory(photographer);
    photographerModel.getUserProfileDOM();
}

function triPopularity(medias){
    medias.sort(function (a,b) {
        return b.likes - a.likes;
    });
}

function triTitle(medias){
    medias.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
}

function triDate(medias){
    medias.sort(function (a,b) {
        return a.date.localeCompare(b.date);
    });
}

// Récupère les medias du photographe correspondant à l'ID photographe
function getProfileMedias(medias){
    medias.forEach((media) => {
        if (media.photographerId == idPhotographer){
            mediaBox.push(media);
        }
    });
}

function displayMedias(medias){
    
    mediaSection.innerHTML = "";

    medias.forEach((media) => {
        const mediaFactoryRes = mediaFactory(media);
        const mediaCardDOM = mediaFactoryRes.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
}


function getNumberLikes(medias){
    numberLikes = 0;
    medias.forEach((media) => {
        numberLikes += media.likes;
    });

    allMediasLikes.textContent = numberLikes;
}

// Incrémente/Décrémente le nb de like du média selectionné
function getLikeClick(Btn){
    const likedMedia = mediaBox.find(media => media.id == Btn.id);
    
    const isLiked = Btn.parentNode.getAttribute('isLiked');
    const btnLike =  Btn.parentNode;
    const divLike = btnLike.parentNode;
    const spanLike = divLike.firstChild;


    if( isLiked == 'false'){
        btnLike.setAttribute('isLiked', 'true');
        likedMedia.likes += 1;
        getNumberLikes(mediaBox);
        spanLike.innerText = parseInt(spanLike.textContent) + 1;
        Btn.classList.add('like-icon__active');
        Btn.classList.remove('like-icon');
    }else{
        btnLike.setAttribute('isLiked', 'false');
        likedMedia.likes -= 1;
        getNumberLikes(mediaBox);
        spanLike.innerText = parseInt(spanLike.textContent) - 1;
        Btn.classList.remove('like-icon__active');
        Btn.classList.add('like-icon');
    }

}

// EventListener des bouttons like
function checkLikes(){
    const btnLikes = document.querySelectorAll(".like-icon");
    btnLikes.forEach((btnLike) => {
        btnLike.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            
            getLikeClick(btnLike);
            
        });

    
    });

    const btnBoxLikes = document.querySelectorAll(".like-button");
    btnBoxLikes.forEach((btnBoxLike) => {
        btnBoxLike.addEventListener("keydown", (event) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }
            if(event.key === "Enter"){
                getLikeClick(btnBoxLike.firstChild);
            }
        });
    });
}

// Modifie le média affiché dans la lightbox
function setMediaLightbox(index){
    zoneLightbox.innerHTML = "";
    if(mediaBox[index].image === undefined){
        const vidLightbox = document.createElement("video");
        vidLightbox.setAttribute("src", "assets/images/" + mediaBox[index].video);
        vidLightbox.setAttribute("class", 'lightbox__media');
        vidLightbox.setAttribute("controls","controls");
        zoneLightbox.appendChild(vidLightbox);
    }else{
        const imgLightbox = document.createElement("img");
        imgLightbox.setAttribute("src", "assets/images/" + mediaBox[index].image);
        imgLightbox.setAttribute("class", 'lightbox__media');
        zoneLightbox.appendChild(imgLightbox);        
    }

    const titleLightbox = document.createElement("h2");
    titleLightbox.setAttribute("class", 'lightbox__title');
    titleLightbox.textContent = mediaBox[index].title;
    zoneLightbox.appendChild(titleLightbox);
    keyControls();
}

function nextMedia(){
    currIndex += 1;
    if(currIndex == mediaBox.length){
        currIndex = 0
    }
    setMediaLightbox(currIndex);
}

function prevMedia(){
    currIndex -= 1;
    if(currIndex < 0){
        currIndex = mediaBox.length - 1;
    }
    setMediaLightbox(currIndex);
}

// Affiche le média clické dans la lightbox 
function displayLightbox(link){
    zoneLightbox.innerHTML = "";
    const srcMedia = link.getAttribute("src");

    mediaBox.forEach((media) => {
        if("assets/images/" + media.video == srcMedia){
            currIndex = mediaBox.indexOf(media);
            const vidLightbox = document.createElement("video");
            vidLightbox.setAttribute("src", srcMedia);
            vidLightbox.setAttribute("class", 'lightbox__media');
            vidLightbox.setAttribute("controls","controls");
            zoneLightbox.appendChild(vidLightbox);

        } else if ("assets/images/" + media.image == srcMedia){
            currIndex = mediaBox.indexOf(media);
            const imgLightbox = document.createElement("img");
            imgLightbox.setAttribute("src", srcMedia);
            imgLightbox.setAttribute("class", 'lightbox__media');
            zoneLightbox.appendChild(imgLightbox);
        }
    });

    const titleLightbox = document.createElement("h2");
    titleLightbox.setAttribute("class", 'lightbox__title');
    titleLightbox.textContent = link.getAttribute("alt");
    zoneLightbox.appendChild(titleLightbox);

    lightbox.style.display = "flex";
    content.setAttribute("aria-hidden", 'true');
    lightbox.setAttribute("aria-hidden", 'false');
    body.classList.add("no-scroll");
    closeBtnLightbox.focus();
    keyControls();
    
    
}

function keyControls(){
    lightbox.addEventListener("keydown", (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
    
      switch (event.key) {
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          // Do something for "left arrow" key press.
          prevMedia();
          break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          // Do something for "right arrow" key press.
          nextMedia();
          break;
        case "Esc": // IE/Edge specific value
        case "Escape":
          // Do something for "esc" key press.
          closeLightbox();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
  });
}

function closeLightbox(){
    lightbox.style.display = "none";
    content.setAttribute("aria-hidden", 'false');
    lightbox.setAttribute("aria-hidden", 'true');
    body.classList.remove("no-scroll");
}

// Envoi le média selectionné dans la lightbox
function getClickMedia() {
    var mediaLink = document.querySelectorAll(".media-content");
    mediaLink.forEach((mediaL) => {
        mediaL.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            
            displayLightbox(mediaL);
        });

        mediaL.addEventListener("keydown", function(e){
            if(e.key === "Enter"){
                e.preventDefault();
                e.stopPropagation();
                
                displayLightbox(mediaL);
            }
        })
    });
    
}


// Initialisation des Event
function InitListener(mediaBox){
    displayMedias(mediaBox);
    checkLikes();
    getClickMedia();
}

selectTri.addEventListener("change", function(event){
    switch(event.target[event.target.selectedIndex].text){
        case "Date":
            triDate(mediaBox);
            InitListener(mediaBox);
            break;
        case "Popularité":
            triPopularity(mediaBox);
            InitListener(mediaBox);
            break;
        case "Titre":
            triTitle(mediaBox);
            InitListener(mediaBox);
            break;
    }
})

closeBtnLightbox.addEventListener("click", function(){
    closeLightbox();
    InitListener(mediaBox);
})

nextBtnLightbox.addEventListener("click", nextMedia);

prevBtnLightbox.addEventListener("click", prevMedia);

async function init() {

    const jsonData = await getPhotographersData();

    const profileData = jsonData.photographers.find(photographer => photographer.id == idPhotographer);

    const medias = jsonData.media;
    
    getProfileMedias(medias);
    getNumberLikes(mediaBox);

    triPopularity(mediaBox);
    InitListener(mediaBox);

    const photographerPrice = document.querySelector(".aside-price");
    const priceDay = profileData.price;

    const contactName = document.querySelector(".contact-name");
    const profileName = profileData.name;

    contactName.textContent = profileName;
    
    photographerPrice.textContent = priceDay;

    displayProfile(profileData);
    
}

init();