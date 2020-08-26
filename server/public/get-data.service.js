const getApiData = () => {
    axios.get('http://localhost:3000/collections')
        .then(response => {
            response.data.forEach((item, index) => {
                var card = document.createElement("div");

                var imgElement = document.createElement("img");
                imgElement.className = 'hero-image';
                imgElement.src = item.imageUrl;

                var collectionElement = document.createElement("div");
                collectionElement.className = "hero-image-description";
                collectionElement.innerText = item.collectionType;

                var imgDescription = document.createElement("div");
                imgDescription.className = 'hero-image-description';

                var itemNameElement = document.createElement("span");
                itemNameElement.innerText = item.name;
                var itemPrice = document.createElement("span");
                itemPrice.className = 'dropdown-icon';
                itemPrice.innerText = item.price;

                var ratingContainer = document.createElement("div");
                ratingContainer.className ='hero-image-description';

                var ratingElement1 = document.createElement("span");
                ratingElement1.className = 'fa fa-star star checked';
                var ratingElement2 = document.createElement("span");
                ratingElement2.className = 'fa fa-star star checked';
                var ratingElement3 = document.createElement("span");
                ratingElement3.className = 'fa fa-star star checked';
                var ratingElement4 = document.createElement("span");
                ratingElement4.className = 'fa fa-star star checked';
                var ratingElement5 = document.createElement("span");
                ratingElement5.className = 'fa fa-star star checked';

                var cartElement = document.createElement("span");
                cartElement.className = 'fa fa-cart-plus dropdown-icon';

                if(index !== 0) {
                    card.className = 'item-card disable-cards';
                } else {
                    card.className = 'item-card';
                }
                card.setAttribute('id', index);
                card.appendChild(imgElement);
                card.appendChild(collectionElement);
                card.appendChild(imgDescription);
                imgDescription.appendChild(itemNameElement);
                imgDescription.appendChild(itemPrice);
                card.appendChild(ratingContainer);
                switch(item.rating) {
                    case 3:
                        ratingContainer.appendChild(ratingElement1);
                        ratingContainer.appendChild(ratingElement2);
                        ratingContainer.appendChild(ratingElement3);
                    break;
                    
                    case 4:
                        ratingContainer.appendChild(ratingElement1);
                        ratingContainer.appendChild(ratingElement2);
                        ratingContainer.appendChild(ratingElement3);
                        ratingContainer.appendChild(ratingElement4);
                    break;

                    case 5:
                        ratingContainer.appendChild(ratingElement1);
                        ratingContainer.appendChild(ratingElement2);
                        ratingContainer.appendChild(ratingElement3);
                        ratingContainer.appendChild(ratingElement4);
                        ratingContainer.appendChild(ratingElement5);
                    break;
                    default:
                }

                ratingContainer.appendChild(cartElement);

                var domElement = document.getElementsByClassName('right-panel');
                domElement[0].appendChild(card);
                if(index + 1 === response.data.length) {
                    for(i =0; i < index; i++)
                    eventListeners(i);
                }
            })
        })
        .catch(error => console.error(error));
};

function eventListeners(id) {
    document.getElementById(id).addEventListener("click", function(event){
        let data = event.currentTarget.id;
        axios.get('http://localhost:3000/item-description?id='+data)
        .then(response => {
            changeRoute(id);
            var primaryPage = document.getElementById('primary');
            primaryPage.style.display = 'none';
            var itemPage = document.getElementById('description-container');
            itemPage.innerHTML  = response.data;
        })
        .catch(error => console.error(error));
    });
}

function changeRoute(descriptionId) {
    let stateObj = { id: 'descrption'+descriptionId }; 
    window.history.pushState(stateObj, "Page 2", "description"+descriptionId); 
}

getApiData();