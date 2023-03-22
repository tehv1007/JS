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
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function getFromStorage2() {
  currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : [];
}
