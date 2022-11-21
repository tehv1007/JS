"use strict";

const sidebar = document.getElementById("sidebar");
const sidebarLogo = document.getElementById("sidebar-title");
sidebarLogo.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

//Khởi tạo các element
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const btnFind = document.getElementById("find-btn");

//Hiển thị Breed
const breedArr = JSON.parse(localStorage.getItem("breedArr"));
const filteredArr = breedArr.filter(
  (
    (set) => (f) =>
      !set.has(f.breed) && set.add(f.breed)
  )(new Set())
);

for (let i = 0; i < filteredArr.length; i++) {
  const option = document.createElement("option");
  option.innerHTML = `<option>${filteredArr[i].breed}</option>`;
  breedInput.appendChild(option);
}

//Hàm render kết quả tìm được
const petArr = JSON.parse(localStorage.getItem("petArr"));
function renderData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<tr>
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${petArr[i].date}</td>
    </tr>`;
    tableBodyEl.appendChild(row);
  }
}

// Tìm kiếm và hiển thị thú cưng theo yêu cầu cụ thể
let results = [];
btnFind.addEventListener("click", function () {
  results = [];
  for (let i = 0; i < petArr.length; i++) {
    if (
      idInput.value.trim().length === 0 ||
      (idInput.value.trim().length !== 0 &&
        petArr[i].id.includes(idInput.value))
    ) {
      if (
        nameInput.value.trim().length === 0 ||
        (nameInput.value.trim().length !== 0 &&
          petArr[i].name.includes(nameInput.value))
      ) {
        if (
          typeInput.selectedIndex === 0 ||
          (typeInput.selectedIndex !== 0 && petArr[i].type === typeInput.value)
        ) {
          if (
            breedInput.selectedIndex === 0 ||
            (breedInput.selectedIndex !== 0 &&
              petArr[i].breed === breedInput.value)
          ) {
            if (
              vaccinatedInput.checked === false ||
              (vaccinatedInput.checked === true &&
                petArr[i].vaccinated === true)
            ) {
              if (
                dewormedInput.checked === false ||
                (dewormedInput.checked === true && petArr[i].dewormed === true)
              ) {
                if (
                  sterilizedInput.checked === false ||
                  (sterilizedInput.checked === true &&
                    petArr[i].sterilized === true)
                ) {
                  results.push(petArr[i]);
                }
              }
            }
          }
        }
      }
    }
  }
  renderData(results);
});
