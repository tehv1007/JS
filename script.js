const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const myName = document.querySelector(".my-name");
const myFocus = document.querySelector(".my-focus");
const body = document.body;

function showTime() {
  const date = new Date(); // constructor function with object, new operator
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  //   time.innerHTML = hour + ":" + minute + ":" + second;
  time.innerHTML = `${hour}:${addZero(minute)}:${addZero(second)}`;
  setTimeout(showTime, 1000);
}

function addZero(number) {
  return number < 10 ? "0" + number : number;
}

function showBackground() {
  const hour = new Date().getHours();
  if (hour < 12) {
    body.style.backgroundImage =
      "url(https://images.unsplash.com/photo-1600245892018-3826141b0822?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    greeting.innerHTML = "Good morning, ";
  } else if (hour < 18) {
    body.style.backgroundImage =
      "url(https://images.unsplash.com/photo-1622653533660-a1538fe8424c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    greeting.innerHTML = "Good afternoon, ";
  } else {
    body.style.backgroundImage =
      "url(https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    greeting.innerHTML = "Good night, ";
  }
}

// Name section
function setName(event) {
  if (event.key === "Enter") {
    localStorage.setItem("name", event.target.innerHTML);
    myName.blur();
  }
}

function getName() {
  if (localStorage.getItem("name") === null) {
    myName.innerHTML = "[Enter name]";
  } else {
    myName.innerHTML = localStorage.getItem("name");
  }
}

// Focus section
function setFocus(event) {
  if (event.key === "Enter") {
    localStorage.setItem("focus", event.target.innerHTML);
    myFocus.blur();
  }
}

function getFocus() {
  if (!localStorage.getItem("focus")) myFocus.innerHTML = "[Enter your Focus]";
  else myFocus.innerHTML = localStorage.getItem("focus");
}

myName.addEventListener("keydown", setName);
myFocus.addEventListener("keydown", setFocus);

showTime();
showBackground();
getName();
getFocus();
