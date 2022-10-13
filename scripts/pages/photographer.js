//Mettre le code JavaScript lié à la page photographer.html

var params = (new URL(document.location)).searchParams;
const idPhotographer = params.get('id');

let mediaBox = [];


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


async function init() {

    const jsonData = await getPhotographersData();

    const profileData = jsonData.photographers.find(photographer => photographer.id == idPhotographer);

    const medias = jsonData.media;
    
    getProfileMedias(medias);
    triPopularity(mediaBox);
    // triTitle(mediaBox);
    // triDate(mediaBox);
    displayMedias(mediaBox);

    const photographerPrice = document.querySelector(".aside-price");
    const priceDay = profileData.price;

    const contactName = document.querySelector(".contact-name");
    const profileName = profileData.name;

    contactName.textContent = profileName;
    
    photographerPrice.textContent = priceDay;


    displayProfile(profileData);
    
};

init();