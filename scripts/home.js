"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
let userIndex = JSON.parse(localStorage.getItem("userIndex"));
let isLogin = JSON.parse(localStorage.getItem("isLogin"));
console.log(currentUser);

if (isLogin) {
  loginModal.style.display = "none";
  mainContent.style.display = "block";
  welcomeMessage.innerHTML = `Welcome ${currentUser[userIndex].firstname}!`;
} else {
  loginModal.style.display = "block";
  mainContent.style.display = "none";
}

logoutBtn.addEventListener("click", () => {
  isLogin = false;
  localStorage.setItem("isLogin", JSON.stringify(isLogin));
  // localStorage.removeItem("currentUser");
  currentUser.splice(userIndex, 1);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "../pages/login.html";
});
