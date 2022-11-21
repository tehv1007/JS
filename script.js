"use strict";
const inputID = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputType = document.getElementById("input-type");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputBreed = document.getElementById("input-breed");
const inputColor = document.getElementById("input-color-1");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");
const petTable = document.getElementById("tbody");

const sidebar = document.getElementById("sidebar");
const sidebarLogo = document.getElementById("sidebar-title");
sidebarLogo.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

const petArr = JSON.parse(localStorage.getItem("petArr")) || [];
renderTableData(petArr);

submitBtn.addEventListener("click", petSubmit);

function petSubmit(e) {
  e.preventDefault();
  const petArr = JSON.parse(localStorage.getItem("petArr")) || [];

  //   Get input form data
  const data = {
    id: inputID.value,
    name: inputName.value,
    age: inputAge.value,
    type: inputType.value,
    weight: inputWeight.value,
    length: inputLength.value,
    breed: inputBreed.value,
    color: inputColor.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
    date: new Date().toLocaleDateString("en-GB"),
  };

  //   Validate input
  let flag = false;
  for (let i = 0; i < petTable.rows.length; i++) {
    if (data.id == petTable.rows[i].cells[0].innerHTML) {
      flag = true;
      break;
    }
  }

  if (flag == true) {
    alert("ID must unique!");
  } else {
    if (data.id == "") alert("PetId must not be empty!");
    else if (data.name == "") alert("Pet Name must not be empty!");
    else if (data.age == "") alert("Age must not be empty!");
    else if (data.age < 1 || data.age > 15)
      alert("Age must be between 1 and 15!");
    else if (data.type == "Select Type") alert("Please select Type!");
    else if (data.weight == "") alert("Please fill in pet weight!");
    else if (data.weight < 1 || data.weight > 15)
      alert("Weight must be between 1 and 15!");
    else if (data.length == "") alert("Please fill in pet length!");
    else if (data.length < 1 || data.length > 100)
      alert("Length must be between 1 and 100!");
    else if (data.breed == "Select Breed") alert("Please select Breed!");
    else {
      petArr.push(data);
      localStorage.setItem("petArr", JSON.stringify(petArr));
      clearInput();
      renderTableData(petArr);
      window.location.reload(true);
    }
  }
}

// 6. Xóa các dữ liệu vừa nhập trên Form
function clearInput() {
  inputID.value = "";
  inputName.value = "";
  inputAge.value = "";
  inputType.value = "Select Type";
  inputWeight.value = "";
  inputLength.value = "";
  inputBreed.value = "Select Breed";
  inputColor.value = "#000000";
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
}

// 5. Hiển thị danh sách thú cưng
function renderTableData(data) {
  petTable.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
  <th scope="row">${data[i].id}</th>
	<td>${data[i].name}</td>
	<td>${data[i].age}</td>
	<td>${data[i].type}</td>
	<td>${data[i].weight} kg</td>
	<td>${data[i].length} cm</td>
	<td>${data[i].breed}</td>
    <td>
        <i class="bi bi-square-fill" style="color: ${data[i].color}"></i>
    </td>
	<td><i class="bi ${
    data[i].vaccinated === false ? "bi-x-circle-fill" : "bi-check-circle-fill"
  } "></i></td>
		<td><i class="bi ${
      data[i].dewormed === false ? "bi-x-circle-fill" : "bi-check-circle-fill"
    } "></i></td>
		<td><i class="bi ${
      data[i].sterilized === false ? "bi-x-circle-fill" : "bi-check-circle-fill"
    } "></i></td>
    <td>?</td>
	<td>${data[i].date}</td>
	<td><button type="button" class="btn btn-danger" onclick="deletePet('${
    data[i].id
  }')">Delete</button>
	</td>
  `;
    petTable.appendChild(row);
  }
}

// 7. Xóa một thú cưng
function deletePet(petId) {
  const petArr = JSON.parse(localStorage.getItem("petArr"));
  if (confirm("Are you sure you want to delete this pet?")) {
    const petIndex = petArr.findIndex((x) => x.id == petId);
    console.log(petIndex);
    petArr.splice(petIndex, 1);
    console.log(petArr);
    localStorage.setItem("petArr", JSON.stringify(petArr));
  }
  renderTableData(petArr);
}

// 8. Hiển thị các thú cưng khỏe mạnh
let healthyCheck = false;
function healthyPets() {
  healthyCheck = !healthyCheck;
  const healthyPetArr = [];
  for (let i = 0; i < petArr.length; i++) {
    if (
      petArr[i].vaccinated === true &&
      petArr[i].dewormed === true &&
      petArr[i].sterilized === true
    ) {
      healthyPetArr.push(petArr[i]);
    }
  }

  if (healthyCheck) {
    renderTableData(healthyPetArr);
    healthyBtn.innerHTML = "Show All Pet";
  } else {
    renderTableData(petArr);
    healthyBtn.innerHTML = "Show Healthy Pet";
  }
}

healthyBtn.addEventListener("click", healthyPets);

// 9. (Nâng cao) Tính toán chỉ số BMI
function bmiCalculate() {
  let bmi = 0;
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      bmi = (petArr[i].weight * 703) / petArr[i].length ** 2;
    } else if (petArr[i].type === "Cat") {
      bmi = (petArr[i].weight * 886) / petArr[i].length ** 2;
    }
    // petTable.rows[i].cells[11].innerHTML = bmi.toFixed(2);
    petTable.rows[i].cells[11].innerHTML = Math.round(bmi * 100) / 100;
  }
}

bmiBtn.addEventListener("click", bmiCalculate);

// Hiển thị Breed trong màn hình quản lý thú cưng
const breedArr = JSON.parse(localStorage.getItem("breedArr"));
function renderBreed(data) {
  inputBreed.innerHTML = `<option>Select Breed</option>`;
  for (let i = 0; i < data.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${data[i].breed}`;
    inputBreed.appendChild(option);
  }
}

inputType.addEventListener("change", setBreed);
function setBreed(event) {
  const tempArr = [];
  const type = event.target.value;
  console.log(type);
  breedArr.forEach((element) => {
    if (element.type == type) {
      tempArr.push(element);
    }
  });
  console.log(tempArr);
  renderBreed(tempArr);
}
