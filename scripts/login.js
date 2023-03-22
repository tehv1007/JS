"use strict";

const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

const userArr = JSON.parse(localStorage.getItem("userArr"));
const currentUser = [];
let userIndex = 0;
let isLogin = false;
console.log(userArr);

loginBtn.addEventListener("click", () => {
  const data = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  let flag = false;
  for (let i = 0; i < userArr.length; i++) {
    if (
      data.username === userArr[i].username &&
      data.password === userArr[i].password
    ) {
      flag = true;
      userIndex = currentUser.push(userArr[i]) - 1;
      localStorage.setItem("userIndex", JSON.stringify(userIndex));
      saveToStorage2();
      break;
    }
  }

  if (data.username === "" || data.password === "")
    alert("Username and password must not be empty");
  else if (userArr.some((user) => user.username == data.username) == false)
    alert("User does not exist, please try again");
  else if (!flag)
    alert("Username not found or Password incorrect. Please check again!");
  else {
    isLogin = true;
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
    window.location.href = "../index.html";
  }
});
