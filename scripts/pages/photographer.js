//Mettre le code JavaScript lié à la page photographer.html

var params = (new URL(document.location)).searchParams;
const idPhotographer = params.get('id');

let mediaBox = [];

var btnTriDate = document.getElementById('date');
var btnTriPop = document.getElementById('pop');
var btnTriTitle = document.getElementById('title');

let numberLikes = 0;
var likes = [];
let n = 0;

var allMediasLikes = document.querySelector(".aside-like-count");



const getPhotographersData = async() => {
    return await fetch('data/photographers.json')
    .then(function(result) { return result.json() })
    .then(function(data){ return data })
    .catch(function(error){ console.log('une erreur fetch' + error)})
};


async function displayProfile(photographer){

    const photographerModel = photographerFactory(photographer);
    photographerModel.getUserProfileDOM();
};

function triPopularity(medias){
    medias.sort(function (a, b) {
        return a.likes < b.likes;
      });
}

function triTitle(medias){
    medias.sort(function (a, b) {
        return a.title > b.title;
      });
}

function triDate(medias){
    medias.sort(function (a, b) {
        return a.date > b.date;
      });
}

function getProfileMedias(medias){
    medias.forEach((media) => {
        if (media.photographerId == idPhotographer){
            mediaBox.push(media);
        }
    });
}

function displayMedias(medias){
    const mediaSection = document.querySelector(".media_section");
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


function getMediaClick(Btn){
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
    }else{
        btnLike.setAttribute('isLiked', 'false');
        likedMedia.likes -= 1;
        getNumberLikes(mediaBox);
        spanLike.innerText = parseInt(spanLike.textContent) - 1;
    }

}



async function init() {

    const jsonData = await getPhotographersData();

    const profileData = jsonData.photographers.find(photographer => photographer.id == idPhotographer);

    const medias = jsonData.media;
    
    getProfileMedias(medias);
    getNumberLikes(mediaBox);

    triPopularity(mediaBox);
    displayMedias(mediaBox);

    btnTriDate.addEventListener("click", function(){
        triDate(mediaBox);
        displayMedias(mediaBox);
    });

    btnTriPop.addEventListener("click", function(){
        triPopularity(mediaBox);
        displayMedias(mediaBox);
    });

    btnTriTitle.addEventListener("click", function(){
        triTitle(mediaBox);
        displayMedias(mediaBox);
    });
    

    const photographerPrice = document.querySelector(".aside-price");
    const priceDay = profileData.price;

    const contactName = document.querySelector(".contact-name");
    const profileName = profileData.name;

    contactName.textContent = profileName;
    
    photographerPrice.textContent = priceDay;

    displayProfile(profileData);
    
    const btnLikes = document.querySelectorAll(".like-icon");
    btnLikes.forEach((btnLike) => {
        btnLike.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            
            getMediaClick(btnLike);
            
        });
    });

    

};

init();