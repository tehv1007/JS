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
const petTable = document.getElementById("tbody");
const editForm = document.getElementById("container-form");

const sidebar = document.getElementById("sidebar");
const sidebarLogo = document.getElementById("sidebar-title");
sidebarLogo.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Chức năng: Edit
const petArr = JSON.parse(localStorage.getItem("petArr")) || [];
const breedArr = JSON.parse(localStorage.getItem("breedArr"));
renderTableData(petArr);

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
	<td>${data[i].date}</td>
	<td><button type="button" class="btn btn-warning" onclick="editPet('${
    data[i].id
  }',${i})">Edit</button>
	</td>
  `;
    petTable.appendChild(row);
  }
}

submitBtn.addEventListener("click", petSubmit);

function petSubmit() {
  const petArr = JSON.parse(localStorage.getItem("petArr")) || [];
  const index = localStorage.getItem("index");
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
    petArr[index] = data;
    localStorage.setItem("petArr", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
    editForm.classList.add("hide");
    // window.location.reload(true);
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

function editPet(data, i) {
  localStorage.setItem("index", JSON.stringify(i));
  const tempArr = [];
  breedArr.forEach((item) => {
    if (item.type == petArr[i].type) {
      tempArr.push(item);
    }
  });
  renderBreed(tempArr);
  editForm.classList.remove("hide");
  inputID.value = petArr[i].id;
  inputName.value = petArr[i].name;
  inputAge.value = petArr[i].age;
  inputType.value = petArr[i].type;
  inputWeight.value = petArr[i].weight;
  inputLength.value = petArr[i].length;
  inputBreed.value = petArr[i].breed;
  inputColor.value = petArr[i].color;
  inputVaccinated.checked = petArr[i].vaccinated;
  inputDewormed.checked = petArr[i].dewormed;
  inputSterilized.checked = petArr[i].sterilized;
}

// Hiển thị Breed trong màn hình quản lý thú cưng
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
