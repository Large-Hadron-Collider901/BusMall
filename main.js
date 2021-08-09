//console.log("Hello-World") Sanity test

// Define classes/instantiate clickable classes/add event handler to track clicks

// Define base set of properties for our object domain

class CatalogItem {
    // Properties that I want but not passed in
    clicks = 0; // how many times the catalog item gets clicked
    timesShown = 0; // percentage of times an item was clicked on when it was shown
    // Initial constructor (MUST BE NAMED CONSTRUCTOR)
    constructor(name, imageSrc) 
    {
        this.name = name; // image name
        this.imageSrc = imageSrc; // src href to image
    };
}
// Add variables we need in multiple places
let leftPageItem = null;
let middlePageItem = null;
let rightPageItem = null; 
let totalClicks = 0;
const MAX_CLICKS_ALLOWED = 25;
// We will randomly pull from a list of bussmall catalog image objects and display them
// First I need them in a list/array.
let allCatalogItemImageObjects = [
new CatalogItem('Bag', 'assets/bag.jpg'),
new CatalogItem('Banana', 'assets/banana.jpg'),
new CatalogItem('Bathroom', 'assets/bathroom.jpg'),
new CatalogItem('Breakfast', 'assets/breakfast.jpg'),
new CatalogItem('Bubblegum', 'assets/bubblegum.jpg'),
new CatalogItem('Chair', 'assets/chair.jpg'),
new CatalogItem('Cthulhu', 'assets/cthulhu.jpg'),
new CatalogItem('Dog duck', 'assets/dog-duck.jpg'),
new CatalogItem('Dragon', 'assets/dragon.jpg'),
new CatalogItem('Hat', 'assets/hat.jpg'),
new CatalogItem('Masonic bible', 'assets/masonic-bible.jpg'),
new CatalogItem('Pen', 'assets/pen.jpg'),
new CatalogItem('Pet sweep', 'assets/pet-sweep.jpg'),
new CatalogItem('Scissors', 'assets/scissors.jpg'),
new CatalogItem('Shark', 'assets/shark.jpg'),
new CatalogItem('Sweep', 'assets/sweep.png'),
new CatalogItem('Tauntaun', 'assets/tauntaun.jpg'),
new CatalogItem('Unicorn', 'assets/unicorn.jpg'),
new CatalogItem('Water can', 'assets/water-can.jpg'),
new CatalogItem('Wine-glass', 'assets/wine-glass.jpg')
];

// Set up our element references in the DOM
const catalogHeader = document.getElementById('catalogHeader')
const catalogItemImageSectionTab = document.getElementById('all_items')
const finalScores = document.getElementById('finalScores')
const leftCatalogItemImageName = document.getElementById('left_catalog_item_name')
const leftCatalogItemImageTag = document.getElementById('left_catalog_item_img')
const middleCatalogItemImageName = document.getElementById('middle_catalog_item_name')
const middleCatalogItemImageTag = document.getElementById('middle_catalog_item_img')
const rightCatalogItemImageName = document.getElementById('right_catalog_item_name')
const rightCatalogItemImageTag = document.getElementById('right_catalog_item_img')

// Implement a function to pick 3 random items
let pickNewItems = function() {
    // randomly pick the left object/item from our list of items
    leftCatalogItemIndex = Math.floor(Math.random() * allCatalogItemImageObjects.length); // classic random pattern with a max
    // randomly pick the middle object/item from our list of items
    middleCatalogItemIndex = Math.floor(Math.random() * allCatalogItemImageObjects.length);
    // randomly pick the right object/item from our list of items
    // TO DO: In the final version we should check to make sure we dont display the same image
    rightCatalogItemIndex = Math.floor(Math.random() * allCatalogItemImageObjects.length);
    // Keep up with the 3 instances of catalog item objects that got picked randomly (so we can update view and click count)
    // Render on page at the targeted sections of the page
    // Update left
    leftCatalogItemImageName.innerText = allCatalogItemImageObjects[leftCatalogItemIndex].name;
    leftCatalogItemImageTag.src = allCatalogItemImageObjects[leftCatalogItemIndex].imageSrc;
    // Update middle
    middleCatalogItemImageName.innerText = allCatalogItemImageObjects[middleCatalogItemIndex].name;
    middleCatalogItemImageTag.src = allCatalogItemImageObjects[middleCatalogItemIndex].imageSrc;
    // Update right 
    rightCatalogItemImageName.innerText = allCatalogItemImageObjects[rightCatalogItemIndex].name;
    rightCatalogItemImageTag.src = allCatalogItemImageObjects[rightCatalogItemIndex].imageSrc;
}

// POE

pickNewItems();