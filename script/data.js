"use strict";

const sidebar = document.getElementById("sidebar");
const sidebarLogo = document.getElementById("sidebar-title");
sidebarLogo.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Export data to a JSON file
function saveDynamicDataToFile() {
  let petArr = localStorage.getItem("petArr");

  let blob = new Blob([petArr], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "petArr.txt");
}

document.getElementById("import-btn").addEventListener("click", () => {
  let fileReader = new FileReader();
  fileReader.onload = function () {
    let parsedJSON = JSON.parse(fileReader.result);
    localStorage.setItem("importPet", JSON.stringify(parsedJSON));
  };
  fileReader.readAsText(document.querySelector(".form-control").files[0]);
  window.location.reload(true);
});

let petArr = JSON.parse(localStorage.getItem("petArr"));
let importPet = JSON.parse(localStorage.getItem("importPet")) || [];
let breedArr = JSON.parse(localStorage.getItem("breedArr"));
let tempArr = [];
console.log(importPet);
console.log(petArr);

importPet.forEach((element) => {
  let flag = false;
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == element.id) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    petArr.push(element);
    tempArr.push(element);
  }
});
localStorage.setItem("petArr", JSON.stringify(petArr));

petArr.forEach((item) => {
  let flag = false;
  const breedEl = {
    breed: item.breed,
    type: item.type,
  };
  for (let i = 0; i < breedArr.length; i++) {
    if (breedArr[i].type == item.type && breedArr[i].breed == item.breed) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    breedArr.push(breedEl);
  }
});
localStorage.setItem("breedArr", JSON.stringify(breedArr));
