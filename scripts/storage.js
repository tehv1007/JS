"use strict";

//Data storage for userArr in local storage
function saveToStorage1() {
  localStorage.setItem("userArr", JSON.stringify(userArr));
}

function getFromStorage1() {
  userArr = localStorage.getItem("userArr")
    ? JSON.parse(localStorage.getItem("userArr"))
    : [];
}

//Data storage for login User in local storage
function saveToStorage2() {
  localStorage.setItem("loginUser", JSON.stringify(loginUser));
}

function getFromStorage2() {
  loginUser = localStorage.getItem("loginUser")
    ? JSON.parse(localStorage.getItem("loginUser"))
    : [];
}
