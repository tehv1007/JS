"use strict";

//4. Home Page
const loginModal = document.getElementById("login-modal");
const loginWelcome = document.getElementById("main-content");
const message = document.getElementById("welcome-message");

const btnLogout = document.getElementById("btn-logout");

let isLogin = JSON.parse(localStorage.getItem("isLogin"));
let loginUser = JSON.parse(localStorage.getItem("loginUser"));
let userIndex = JSON.parse(localStorage.getItem("userIndex"));

if (isLogin) {
  loginModal.style.display = "none";
  loginWelcome.style.display = "block";
  message.innerHTML = `Welcome ${loginUser[userIndex].firstname}`;
} else {
  loginModal.style.display = "block";
  loginWelcome.style.display = "none";
}

//5. Chức năng Logout
btnLogout.addEventListener("click", function () {
  isLogin = false;
  localStorage.setItem("isLogin", JSON.stringify(isLogin));
  window.location.href = "./pages/login.html";
  loginUser.splice(userIndex, 1);
  localStorage.setItem("loginUser", JSON.stringify(loginUser));
});
