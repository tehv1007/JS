"use strict";

const firstname = document.getElementById("input-firstname");
const lastname = document.getElementById("input-lastname");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

let userArr = [];

function validateForm(user) {
  getFromStorage1();
  let flag = false;
  for (let i = 0; i < userArr.length; i++) {
    if (user.username == userArr[i].username) {
      flag = true;
      break;
    }
  }

  if (flag) {
    alert("Username already exists");
  } else {
    if (user.firstname.trim().length == 0) alert("First Name can't be empty");
    else if (user.lastname.trim().length == 0)
      alert("Last Name can't be empty");
    else if (user.username.trim().length == 0) alert("Username can't be empty");
    else if (user.password.trim().length == 0) alert("Password can't be empty");
    else if (user.password.trim().length <= 8)
      alert("Password length must be longer than 8 characters");
    else if (user.confirmPassword.trim().length == 0)
      alert("Confirm Password can't be empty");
    else if (user.password != user.confirmPassword)
      alert("Password and Confirm Password must be the same");
    else {
      userArr.push(user);
      saveToStorage1();
      window.location.href = "../pages/login.html";
    }
  }
}

submitBtn.addEventListener("click", addUser);
function addUser() {
  const user = {
    firstname: firstname.value,
    lastname: lastname.value,
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };
  validateForm(user);
}
