function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        article.classList.add('photographer-article');

        const url = `./photographer.html?id=${id}`;
        const link = document.createElement( 'a' );
        link.setAttribute("href", url);

        const mainSection = document.createElement( 'div');

        const img = document.createElement( 'img' );
        img.classList.add('photographer-article__img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", 'photo de '+ name);

        const h2 = document.createElement( 'h2' );
        h2.classList.add('photographer-article__name');
        h2.setAttribute("aria-label", name);
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

    function getUserProfileDOM() {
        const profile = document.querySelector(".photograph-header");

        const img = document.createElement( 'img' );
        img.classList.add('photographer-header__img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", 'photo de '+ name);

        const detailDiv = document.createElement( 'div' );
        detailDiv.classList.add('photographer-header__detail');

        const profile_name = document.createElement( 'h1' );
        profile_name.classList.add('photographer-header__name');
        profile_name.setAttribute("aria-label", name);
        profile_name.textContent = name;

        const info = document.createElement( 'p' );
        info.setAttribute("class",'photographer-header__info');

        const location = document.createElement( 'span' );
        location.classList.add('photographer-header__location');
        location.textContent = city + ', ' + country;

        const taglineSpan = document.createElement( 'span' );
        taglineSpan.classList.add('photographer-header__tagline');
        taglineSpan.textContent = tagline;

        info.appendChild(location);
        info.appendChild(taglineSpan);

        detailDiv.appendChild(profile_name);
        detailDiv.appendChild(info);

        profile.insertAdjacentElement('afterbegin', detailDiv);
        profile.insertAdjacentElement('beforeend', img);
    }


    return { name, picture, getUserCardDOM, getUserProfileDOM}
}



function mediaFactory(data) {
    const {id,photographerId,title,image,video,likes,date,price} = data;

    const media_picture = `assets/images/${image}`;
    const media_video = `assets/images/${video}`;

    function getMediaCardDOM(){
        const mediaLink = document.createElement( 'article' );
        mediaLink.classList.add('mediaLink');

        const detailMedia = document.createElement( 'div' );
        detailMedia.classList.add('media-detail');

        const mediaTitle = document.createElement( 'span' );
        mediaTitle.classList.add('media-title');
        mediaTitle.textContent = title;

        const likeDetail = document.createElement( 'div' );
        likeDetail.classList.add('like-details');

        var nbLike = document.createElement( 'span' );
        nbLike.classList.add('media-likes');
        nbLike.textContent = likes;

        const btnLike = document.createElement( 'button' );
        btnLike.classList.add('like-button');
        btnLike.setAttribute("isLiked", 'false');
        

        const iconLike = document.createElement( 'i' );
        iconLike.classList.add('fa-solid', 'fa-heart', 'like-icon');
        iconLike.setAttribute("id", id);

        btnLike.appendChild(iconLike);

        likeDetail.appendChild(nbLike);
        likeDetail.appendChild(btnLike);

        detailMedia.appendChild(mediaTitle);
        detailMedia.appendChild(likeDetail);

        if (video === undefined){
            const img = document.createElement( 'img' );
            img.classList.add('media-content');
            img.setAttribute("src", media_picture);
            img.setAttribute("alt", title);
            img.setAttribute("tabindex", 0);

            mediaLink.appendChild(img);
        }
        else {
            const vid = document.createElement( 'video' );
            vid.classList.add('media-content');
            vid.setAttribute("src", media_video);
            vid.setAttribute("alt", title);
            vid.setAttribute("tabindex", 0);

            mediaLink.appendChild(vid);
        }

        mediaLink.appendChild(detailMedia);

        return (mediaLink);
    }

    return { getMediaCardDOM };
}