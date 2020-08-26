var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mockData = require("./mock-data.json");
var Document = require('html-document');
var document = new Document();

var template = `  <div class="data-container-secondary">
<div class="left-container">
    <div class="selected-image">
        <img class="hero-image" src="images/sofa1.jpg">
        <i class="fa fa-long-arrow-right next-image-arrow" aria-hidden="true"></i>
    </div>
    <div class="alternate-image-container">
        <img class="alternate-image" src="images/sofa2.jpg">
        <img class="alternate-image" src="images/sofa3.jpg">
    </div>
</div>
<div class="right-container">
    <div class="description-container">
        <div class="item-name">Wooden Sofa</div>
        <div class="collection-type hero-image-description">Living Room</div>
        <div class="description hero-image-description">A sofa is a piece of furniture that a few people can comfortably sit on together. ... Sofas are typically upholstered, with a high back and arms. 
        </div>
        <div class="color-box hero-image-description">
            <div>Color</div>
            <div class="avail-color hero-image-description"></div>
        </div>
        <div class="hero-image-description">
            Price per unit
        </div>
        <div class="item-price-box hero-image-description">
            <span>$5000</span>
            <button class="button">Buy Now</button>
            <span class="fa fa-cart-plus"></span>
        </div>
    </div>
</div>
</div>`

function createItemDescriptionPage(imageUrl, altImage1, altImage2, itemName, collectionName ,itemDescriptionText, pricePerUnit) {
    var secondaryContainer = document.createElement("div");
    secondaryContainer.className = 'data-container-secondary';

    var secondaryContainerLeft = document.createElement("div");
    secondaryContainerLeft.className = 'left-container';

    var secondaryImageContainer = document.createElement("div");
    secondaryImageContainer.className = 'selected-image';

    var imgElement = document.createElement("img");
    imgElement.className = 'hero-image';
    imgElement.src = imageUrl;

    var nextImageIcon = document.createElement("i");
    nextImageIcon.className = 'fa fa-long-arrow-right next-image-arrow';

    var alternateImagesContainer = document.createElement("div");
    alternateImagesContainer.className = 'alternate-image-container';

    var altImgElement1 = document.createElement("img");
    altImgElement1.className = 'alternate-image';
    altImgElement1.src = altImage1;

    var altImgElement2 = document.createElement("img");
    altImgElement2.className = 'alternate-image';
    altImgElement2.src = altImage2;

    var secondaryContainerRight = document.createElement("div");
    secondaryContainerRight.className = 'secondaryContainerRight';

    var itemDescriptionContainer = document.createElement("div");
    itemDescriptionContainer.className = 'description-container';

    var itemNameElement = document.createElement("div");
    itemNameElement.className = 'item-name';
    itemNameElement.innerText = itemName;

    var collectionTypeElement = document.createElement("div");
    collectionTypeElement.className = 'collection-type hero-image-description';
    collectionTypeElement.innerText = collectionName;

    var itemDescriptionElement = document.createElement("div");
    itemDescriptionElement.className = 'description hero-image-description';
    itemDescriptionElement.innerText = itemDescriptionText;

    var itemColorDescription = document.createElement("div");
    itemColorDescription.className = 'color-box hero-image-description';

    var colorText = document.createElement("div");
    colorText.innerText = 'Color';
    
    var availColor = document.createElement("div");
    availColor.className = 'avail-color hero-image-description';

    var priceText = document.createElement("div");
    priceText.className = 'hero-image-description';
    priceText.innerText = 'Price per unit';

    var descriptionFooter = document.createElement("div");
    descriptionFooter.className = 'item-price-box hero-image-description';

    var itemPrice = document.createElement("span");
    itemPrice.innerText = pricePerUnit;

    var buyNowButton = document.createElement("button");
    buyNowButton.className = 'button';
    buyNowButton.innerText = 'Buy Now';

    var cartIcon = document.createElement("span");
    cartIcon.className = 'fa fa-cart-plus';

    secondaryContainer.appendChild(secondaryContainerLeft);
    secondaryContainerLeft.appendChild(secondaryImageContainer);
    secondaryImageContainer.appendChild(imgElement);
    secondaryImageContainer.appendChild(nextImageIcon);
    secondaryContainerLeft.appendChild(alternateImagesContainer);
    alternateImagesContainer.appendChild(altImgElement1);
    alternateImagesContainer.appendChild(altImgElement2);
    secondaryContainer.appendChild(secondaryContainerRight);
    secondaryContainerRight.appendChild(itemDescriptionContainer);
    itemDescriptionContainer.appendChild(itemName);
    itemDescriptionContainer.appendChild(collectionTypeElement);
    itemDescriptionContainer.appendChild(itemDescriptionElement);
    itemDescriptionContainer.appendChild(itemColorDescription);
    itemColorDescription.appendChild(colorText);
    itemColorDescription.appendChild(availColor);
    itemDescriptionContainer.appendChild(priceText);
    itemDescriptionContainer.appendChild(descriptionFooter);
    descriptionFooter.appendChild(itemPrice);
    descriptionFooter.appendChild(buyNowButton);
    descriptionFooter.appendChild(cartIcon);

    console.log(secondaryContainer);
    return secondaryContainer;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

app.get('/collections', (req, res) => {
    res.json(mockData);
});

app.get('/item-description' , (req, res) => {
    // const query = req.query.id;
    // console.log(query);
    // var htmlTemplate;
    // mockData.forEach((item, index) => {
    //     if(query == index) {
    //         console.log(item);
    //         htmlTemplate = createItemDescriptionPage(item.imageUrl, item.secondaryImages[0], item.secondaryImages[1], 
    //         item.name, item.collectionType, item.description, item.price);
    //     }
    // })
    res.send(template);
}) 