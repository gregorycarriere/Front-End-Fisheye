function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        article.classList.add('photographer-article');

        const url = `./profile.html?id=${id}`;
        const link = document.createElement( 'a' );
        link.setAttribute("href", url);

        const mainSection = document.createElement( 'div');

        const img = document.createElement( 'img' );
        img.classList.add('photographer-article__img');
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.classList.add('photographer-article__name');
        h2.textContent = name;

        const infoSection = document.createElement( 'section');

        const location = document.createElement( 'h3' );
        location.classList.add('photographer-article__location');
        location.textContent = city + ', ' + country;

        const taglineSpan = document.createElement( 'span' );
        taglineSpan.classList.add('photographer-article__tagline');
        taglineSpan.textContent = tagline;

        const priceSpan = document.createElement( 'span' );
        priceSpan.classList.add('photographer-article__price');
        priceSpan.textContent = price + '€/jour';
        

        mainSection.appendChild(img);
        mainSection.appendChild(h2);

        infoSection.appendChild(location);
        infoSection.appendChild(taglineSpan);
        infoSection.appendChild(priceSpan);

        link.appendChild(mainSection);
        link.appendChild(infoSection);

        article.appendChild(link);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}