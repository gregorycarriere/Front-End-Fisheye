import  photographerFactory from "../factories/photographer.js"

// Récupère toutes les données des photographes du fichier JSON
const getPhotographers = async() => {
    return await fetch('data/photographers.json')
    .then(function(result) { return result.json() })
    .then(function(data){ return data.photographers })        
    .catch(function(error){ console.log('une erreur fetch' + error)})
}

// Affiche les données des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}
    
init();
    