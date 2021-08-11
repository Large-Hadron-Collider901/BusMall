
const itemContainer = document.querySelector("#all_items");
const aside = document.querySelector("aside");
// add button to show results for how many times an image was clicked
const myButton = document.createElement("button");
myButton.textContent = "View Results";
const ctx = document.querySelector("#myChart").getContext("2d");
// Add variables we need in multiple places
const maxClicksAllowed = 5;
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
        label: "# of votes",
        data: [],
        backgroundColor: "rgba(255, 151, 23, 1)",
      },
      {
        label: "times shown",
        data: [],
        backgroundColor: "rgba(121, 33, 184, 1)",
      },
    ],
  },
  options: {
    responsive: false,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: maxClicksAllowed,
      },
    },
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
  const catalogHeader = document.getElementById("catalogHeader");

  for (const item of catalogItems) {
    barChart.data.labels.push(item.name);
    barChart.data.datasets[0].data.push(item.clicks);
    barChart.data.datasets[1].data.push(item.timesShown);
  }
  //aside.append(catalogHeader);
  myButton.removeEventListener("click", listResults);
  const resultsChart = new Chart(ctx, barChart);
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
const catalogItems = [
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

// function that sets items for three main divs
const selectPreferredItem = () => {
  // select dom elements
  const leftItemImg = document.querySelector("#left_catalog_item_img");
  const middleItemImg = document.querySelector("#middle_catalog_item_img");
  const rightItemImg = document.querySelector("#right_catalog_item_img");
  const leftItemName = document.querySelector("#left_catalog_item_name");
  const middleItemName = document.querySelector("#middle_catalog_item_name");
  const rightItemName = document.querySelector("#right_catalog_item_name");

  // get random number that'll be used to get random CatalogItem
  let leftIndex = randomize(catalogItems);
  let middleIndex = randomize(catalogItems);
  let rightIndex = randomize(catalogItems);

  // check for duplicate indices
  let leftMiddle = leftIndex === middleIndex;
  let rightLeft = rightIndex === leftIndex;
  let middleRight = middleIndex === rightIndex;

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

itemContainer.addEventListener("click", handleClickOnItem);
selectPreferredItem();
