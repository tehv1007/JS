"use strict";

let userArr = JSON.parse(localStorage.getItem("userArr"));

const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

let loginUser = [];
let isLogin = false;
let userIndex = 0;

//3. Chức năng Login
btnLogin.addEventListener("click", function () {
  getFromStorage2();
  const data = {
    username: userNameInput.value,
    password: passwordInput.value,
  };

  //Validate dữ liệu hợp lệ
  let flag = false;
  for (let i = 0; i < userArr.length; i++) {
    if (
      userNameInput.value === userArr[i].username &&
      passwordInput.value === userArr[i].password
    ) {
      flag = true;
      userIndex = loginUser.push(userArr[i]) - 1;
      localStorage.setItem("userIndex", JSON.stringify(userIndex));
      saveToStorage2();
      break;
    }
  }

  //Kiểm tra từng yêu cầu được đưa ra
  if (userNameInput.value.trim().length === 0) {
    alert("Please input for your User Name!");
    return;
  } else if (passwordInput.value.trim().length === 0) {
    alert("Please input for your Password!");
    return;
  } else if (!flag) {
    alert("Username not found or Password incorrect. Please check again!");
    return;
  } else {
    isLogin = true;
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }
  window.location.href = "../index.html";
});
