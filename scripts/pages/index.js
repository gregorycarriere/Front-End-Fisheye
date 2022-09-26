
    // async function getPhotographers() {
    //     // Penser à remplacer par les données récupérées dans le json

    //     fetch('/data/photographers.json')
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error("HTTP error " + response.status);
    //         }
    //         return response.json();
            
    //     })
    //     .then(json => {

    //         photographersData = json.photographers;
    //         console.log(photographersData);
    //         return photographersData;
    //     })
    //     .catch(function () {
    //         this.dataError = true;
    //     })


        // const photographers = [
        //     {
        //         "name": "Ma data test",
        //         "id": 1,
        //         "city": "Paris",
        //         "country": "France",
        //         "tagline": "Ceci est ma data test",
        //         "price": 400,
        //         "portrait": "account.png"
        //     },
        //     {
        //         "name": "Autre data test",
        //         "id": 2,
        //         "city": "Londres",
        //         "country": "UK",
        //         "tagline": "Ceci est ma data test 2",
        //         "price": 500,
        //         "portrait": "account.png"
        //     },
        // ]
        // // et bien retourner le tableau photographers seulement une fois
        // return ({
        //     photographers: [...photographers, ...photographers, ...photographers]})
        
    // }

    const getPhotographers = async() => {
        return await fetch('data/photographers.json')
        .then(function(result) { return result.json() })
        .then(function(data){ return data.photographers })
        .catch(function(error){ console.log('une erreur fetch' + error)})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    