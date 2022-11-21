"use strict";

const breedInput = document.getElementById("input-breed");
const breedType = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const breedTable = document.getElementById("tbody");

const sidebar = document.getElementById("sidebar");
const sidebarLogo = document.getElementById("sidebar-title");
sidebarLogo.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Chức năng: Quản lý Breed
const breedArr = JSON.parse(localStorage.getItem("breedArr")) || [];
renderTableData(breedArr);

submitBtn.addEventListener("click", addBreed);

function addBreed(e) {
  e.preventDefault();
  const breedArr = JSON.parse(localStorage.getItem("breedArr")) || [];

  const data = {
    breed: breedInput.value,
    type: breedType.value,
  };

  let flag = false;
  for (let i = 0; i < breedTable.rows.length; i++) {
    if (
      data.breed == breedTable.rows[i].cells[1].innerHTML &&
      data.type == breedTable.rows[i].cells[2].innerHTML
    ) {
      flag = true;
      break;
    }
  }

  if (flag == true) {
    alert("Breed must unique!");
  } else {
    if (data.breed === "") {
      alert("Please enter a breed");
    } else if (data.type === "Select Type") {
      alert("Please select a type");
    } else {
      breedArr.push(data);
      localStorage.setItem("breedArr", JSON.stringify(breedArr));
      clearInput();
      renderTableData(breedArr);
      window.location.reload(true);
    }
  }
}

function renderTableData(data) {
  breedTable.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${breedTable.rows.length + 1}</td>
        <td>${data[i].breed}</td>
        <td>${data[i].type}</td>
        <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
          data[i].breed
        }','${data[i].type}')">Delete</button>
	    </td>
`;
    breedTable.appendChild(row);
  }
}

function clearInput() {
  breedInput.value = "";
  breedType.value = "Select Type";
}

function deleteBreed(id, type) {
  const breedIndex = breedArr.findIndex(
    (item) => item.breed === id && item.type === type
  );
  if (confirm("Are you sure you want to delete this pet?")) {
    breedArr.splice(breedIndex, 1);
    localStorage.setItem("breedArr", JSON.stringify(breedArr));
    clearInput();
    renderTableData(breedArr);
  }
}
