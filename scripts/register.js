"use strict";

//2. Chức năng Register
//Khởi tạo các element
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirm = document.getElementById("input-password-confirm");

const btnRegister = document.getElementById("btn-submit");

let userArr = [];

//Bắt sự kiện Click vào nút "Register"
btnRegister.addEventListener("click", function () {
  getFromStorage1();
  const data = {
    firstname: firstNameInput.value,
    lastname: lastNameInput.value,
    username: userNameInput.value,
    password: passwordInput.value,
    pwconfirm: passwordConfirm.value,
  };

  //Validate dữ liệu hợp lệ
  let flag = false;
  for (let i = 0; i < userArr.length; i++) {
    if (userNameInput.value === userArr[i].username) {
      flag = true;
      break;
    }
  }

  //Kiểm tra từng yêu cầu được đưa ra
  if (firstNameInput.value.trim().length === 0) {
    alert("Please input for your First Name!");
    return;
  } else if (lastNameInput.value.trim().length === 0) {
    alert("Please input for your Last Name!");
    return;
  } else if (userNameInput.value.trim().length === 0) {
    alert("Please input for an Username!");
    return;
  } else if (flag) {
    alert("Username must unique!");
    return;
  } else if (passwordInput.value.trim().length === 0) {
    alert("Please input for an Password!");
    return;
  } else if (passwordInput.value.trim().length <= 8) {
    alert("Password must be more than 8 characters!");
    return;
  } else if (passwordConfirm.value.trim().length === 0) {
    alert("Please input for confirm your Password!");
    return;
  } else if (passwordConfirm.value !== passwordInput.value) {
    alert("Password and Confirm Password must be the same!");
    return;
  } else {
    userArr.push(data);
    saveToStorage1();
  }
  window.location.href = "../pages/login.html";
});

function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}
