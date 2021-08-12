
const itemContainer = document.querySelector("#all_items");
const aside = document.querySelector("aside");
// add button to show results for how many times an image was clicked
const myButton = document.createElement("button");
const clearButton = document.createElement("button");
clearButton.textContent = "Clear Data"
myButton.textContent = "View Results";
const ctx = document.querySelector("#myChart").getContext("2d");
// Add variables we need in multiple places
const maxClicksAllowed = 10;
let totalClicks = 0;
let leftCatalogItem = null;
let middleCatalogItem = null;
let rightCatalogItem = null;

const barChart = {
 type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Number Of Votes",
        data: [],
        backgroundColor: "rgba(255, 151, 23, 1)",
      },
      {
        label: "Times Shown",
        data: [],
        backgroundColor: "rgba(121, 33, 184, 1)",
      },
    ],
  },
  options: {
    responsive: false,
    // scales: {
    //   y: {
    //     suggestedMin: 0,
    //     suggestedMax: maxClicksAllowed,
    //   },
    // },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Eczar",
          },
        },
      },
    },
  },
};

// Helper functions
const randomize = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const determinePlural = (num, string) => {
  if (num === 1) return `${num} ${string.slice(0, -1)}`;
  return `${num} ${string}`;
};

const listResults = () => {
  updateLocalData();
  const catalogHeader = document.getElementById("catalogHeader");

  for (const item of catalogItems) {
    barChart.data.labels.push(item.name);
    barChart.data.datasets[0].data.push(item.clicks);
    barChart.data.datasets[1].data.push(item.timesShown);
  }
  //aside.append(catalogHeader);
  myButton.removeEventListener("click", listResults);
  const resultsChart = new Chart(ctx, barChart);
  document.body.append(clearButton);
  clearButton.addEventListener("click", (e) => {
    localStorage.clear();
    window.location.reload();
 });
};

//Define classes/instantiate clickable classes/add event handler to track clicks
// Define base set of properties for our object domain
class CatalogItem {
  // Properties that I want but not passed in
  timesShown = 0;
  clicks = 0;
  // Initial constructor (MUST BE NAMED CONSTRUCTOR)
  constructor(name, imgSrc) {
    this.name = name; // image name
    this.imgSrc = imgSrc; // src href to image
  }
}
// We will randomly pull from a list of bus mall catalog image objects and display them
// First I need them in a list/array.
let catalogItems = [
  new CatalogItem("Bag", "assets/bag.jpg"),
  new CatalogItem("Banana", "assets/banana.jpg"),
  new CatalogItem("Bathroom", "assets/bathroom.jpg"),
  new CatalogItem("Breakfast", "assets/breakfast.jpg"),
  new CatalogItem("Bubblegum", "assets/bubblegum.jpg"),
  new CatalogItem("Chair", "assets/chair.jpg"),
  new CatalogItem("Cthulhu", "assets/cthulhu.jpg"),
  new CatalogItem("Dog duck", "assets/dog-duck.jpg"),
  new CatalogItem("Dragon", "assets/dragon.jpg"),
  new CatalogItem("Masonic bible", "assets/masonic-bible.jpg"),
  new CatalogItem("Pen", "assets/pen.jpg"),
  new CatalogItem("Pet sweep", "assets/pet-sweep.jpg"),
  new CatalogItem("Scissors", "assets/scissors.jpg"),
  new CatalogItem("Shark", "assets/shark.jpg"),
  new CatalogItem("Sweep", "assets/sweep.png"),
  new CatalogItem("Tauntaun", "assets/tauntaun.jpg"),
  new CatalogItem("Unicorn", "assets/unicorn.jpg"),
  new CatalogItem("Water can", "assets/water-can.jpg"),
  new CatalogItem("Wine-glass", "assets/wine-glass.jpg"),
];
// variable for ensuring indices aren't repeated in next round
let prevLeft = 0;
let prevMiddle = 0;
let prevRight = 0;

// function that sets items for three main divs
const selectPreferredItem = () => {
  // select dom elements
  const leftItemImg = document.querySelector("#left_catalog_item_img");
  const middleItemImg = document.querySelector("#middle_catalog_item_img");
  const rightItemImg = document.querySelector("#right_catalog_item_img");
  const leftItemName = document.querySelector("#left_catalog_item_name");
  const middleItemName = document.querySelector("#middle_catalog_item_name");
  const rightItemName = document.querySelector("#right_catalog_item_name");

  let prevRound = [prevLeft, prevMiddle, prevRight];

  // get random number that'll be used to get random CatalogItem
  let leftIndex = randomize(catalogItems);
  let middleIndex = randomize(catalogItems);
  let rightIndex = randomize(catalogItems);

  // check for duplicate indices
  let leftMiddle = leftIndex === middleIndex;
  let rightLeft = rightIndex === leftIndex;
  let middleRight = middleIndex === rightIndex;
// for first round, only prevent duplicates of current indices
  if (totalClicks < 1) {
    while (leftMiddle || rightLeft || middleRight) {
      if (leftMiddle) {
        leftIndex = randomize(catalogItems);
      } else if (rightLeft) {
        rightIndex = randomize(catalogItems);
      } else if (middleRight) {
        middleIndex = randomize(catalogItems);
      }
      leftMiddle = leftIndex === middleIndex;
      rightLeft = rightIndex === leftIndex;
      middleRight = middleIndex === rightIndex;
    }
    // for the following rounds, prevent duplicates of current indices and previous round's indices
  } else {
    while (
      leftMiddle ||
      rightLeft ||
      middleRight ||
      prevRound.indexOf(leftIndex) > -1 ||
      prevRound.indexOf(middleIndex) > -1 ||
      prevRound.indexOf(rightIndex) > -1
    ) {
      if (leftMiddle || prevRound.indexOf(leftIndex) > -1)
        leftIndex = randomize(catalogItems);
      else if (rightLeft || prevRound.indexOf(rightIndex) > -1)
        rightIndex = randomize(catalogItems);
      else if (middleRight || prevRound.indexOf(middleIndex) > -1)
        middleIndex = randomize(catalogItems);

      leftMiddle = leftIndex === middleIndex;
      rightLeft = rightIndex === leftIndex;
      middleRight = middleIndex === rightIndex;
    }
  }

  // reassign previous indicies for next round
  prevLeft = leftIndex;
  prevMiddle = middleIndex;
  prevRight = rightIndex;

  // Use random indices to get random catalog item
  leftCatalogItem = catalogItems[leftIndex];
  middleCatalogItem = catalogItems[middleIndex];
  rightCatalogItem = catalogItems[rightIndex];

  // Set up our element references in the DOM
  leftItemName.textContent = leftCatalogItem.name;
  middleItemName.textContent = middleCatalogItem.name;
  rightItemName.textContent = rightCatalogItem.name;

  leftItemImg.src = leftCatalogItem.imgSrc;
  middleItemImg.src = middleCatalogItem.imgSrc;
  rightItemImg.src = rightCatalogItem.imgSrc;
};

// Handle clicks on the items
// Get which item clicked on from the event target
const handleClickOnItem = (e) => {
  console.log(`You clicked this target element id ${e.target.id}`);
  
  // if they can still click, do clicky things
  if (totalClicks < maxClicksAllowed) {
    const itemId = e.target.id;

    const idOptions = [
      "left_catalog_item_img",
      "middle_catalog_item_img",
      "right_catalog_item_img",
    ];

    // If catalog item image is clicked
    if (idOptions.includes(itemId)) {
      // Mark that they were shown
      leftCatalogItem.timesShown++;
      middleCatalogItem.timesShown++;
      rightCatalogItem.timesShown++;
      // Update click header status and log (+1 because we started at zero)
      catalogHeader.innerText = `You have clicked on ${totalClicks+1} items, out of the total ${maxClicksAllowed}`;

      // If left item was clicked
      if (idOptions.indexOf(itemId) === 0) {
        leftCatalogItem.clicks++; 
        console.log(
          `Left item ${leftCatalogItem.name} has ${determinePlural(
            leftCatalogItem.clicks,
            "clicks"
          )} so far`
        );
        // If middle item was clicked
      } else if (idOptions.indexOf(itemId) === 1) {
        middleCatalogItem.clicks++;
        console.log(
          `Middle item ${middleCatalogItem.name} has ${determinePlural(
            middleCatalogItem.clicks,
            "clicks"
          )} so far`
        );
        // If right item was clicked
      } else {
        rightCatalogItem.clicks++; 
        console.log(
          `Right item ${rightCatalogItem.name} has ${determinePlural(
            rightCatalogItem.clicks,
            "clicks"
          )} so far`
        );
      }
      totalClicks++;
      console.log(
        `Left item ${leftCatalogItem.name} has been shown ${determinePlural(
          leftCatalogItem.timesShown,
          "times"
        )}.\nMiddle item ${
          middleCatalogItem.name
        } has been shown ${determinePlural(
          middleCatalogItem.timesShown,
          "times"
        )} times.\nRight item ${
          rightCatalogItem.name
        } has been shown ${determinePlural(
          rightCatalogItem.timesShown,
          "times"
        )} times.`
      );
      if (totalClicks !== maxClicksAllowed) selectPreferredItem();
    }
  }

  if (totalClicks === maxClicksAllowed) {
    itemContainer.removeEventListener("click", handleClickOnItem);
    console.log(`You picked ${maxClicksAllowed} items, thanks!`);
    alert(`You picked ${maxClicksAllowed} items, thanks!`);
    aside.append(myButton);
   myButton.addEventListener("click", listResults);
  
  }
};

// Create a function to store local data 
// Use JSON.stringify to convert array into JSON string
// Then we can pass the JSON string to local storage

function updateLocalData() { // heres the function
  
  const json = JSON.stringify(catalogItems); // stringify converts the array into JSON string
  localStorage.setItem("catalogItems", json); // setItem stores values in localStorage
};

// Create a function to return the array represented by the JSON string
function getLocalStorage() { //here's the function
  
  const oldData = localStorage.getItem("catalogItems"); // retrieve the JSON string from the key 
  const oldItemData = JSON.parse(oldData); // parse the string to convert it back into an array
  if (oldItemData !== null) { 
    catalogItems = oldItemData;
    console.log(localStorage.getItem("catalogItems")); // data shows up in the console even after refresh
  }
  
};

getLocalStorage();


itemContainer.addEventListener("click", handleClickOnItem);
selectPreferredItem();


